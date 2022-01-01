import { useState, useEffect, useRef } from 'react';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Chat from '../../components/Chat/Chat';
import ChatListSearch from '../../components/Chat/ChatListSearch';
import Message from '../../components/Chat/Message';
import Banner from '../../components/Chat/Banner';
import { Grid, Divider, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { chatService } from '../../services/chat';
import { baseUrl } from '../../utils/helpers';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import MessageInputField from '../../components/Chat/MessageInputField';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  listMessage: {
    overflowY: 'auto',
    maxHeight: 640,
    height: 640,
    padding: 5,
  },
}));

const scrollDivToBottom = (divRef) =>
  divRef.current !== null && divRef.current?.scrollIntoView({ behavior: 'smooth' });

export default function Messages({ chatsData }) {
  const [chats, setChats] = useState(chatsData);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  const divRef = useRef();
  const socket = useRef();

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [bannerData, setBannerData] = useState({ username: '', avatar: '' });
  const openChatId = useRef('');

  const classes = useStyles();

  //CONNECTION useEffect
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit('join', { userId: currentUser._id });

      socket.current.on('connected-users', ({ users }) => {
        setConnectedUsers(users);
      });

      if (chats?.length > 0 && !router.query.message) {
        router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
          shallow: true,
        });
      }
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current.off();
      }
    };
  }, []);

  // LOAD MESSAGES useEffect
  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('load-messages', {
        userId: currentUser._id,
        messagesWith: router.query.message,
      });

      socket.current.on('messages-loaded', async ({ data }) => {
        setMessages(data.chat.messages);
        setBannerData({
          username: data.chat.messagesWith.username,
          avatar: data.chat.messagesWith.avatar,
        });

        openChatId.current = data.chat.messagesWith._id;
        divRef.current && scrollDivToBottom(divRef);
      });

      socket.current.on('no-chat-found', async () => {
        const { username, avatar } = await getUser(router.query.message);

        setBannerData({ username, avatar });
        setMessages([]);

        openChatId.current = router.query.message;
      });
    };

    if (socket.current && router.query.message) loadMessages();
  }, [router.query.message]);

  const sendMsg = (msg) => {
    if (socket.current) {
      socket.current.emit('send-new-msg', {
        userId: currentUser._id,
        msgSendToUserId: openChatId.current,
        msg,
      });
    }
  };

  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef);
  }, [messages]);

  return (
    <>
      <Seo title="Post Details" description="Post Details" />
      <Header />
      <Grid
        container
        className="max-w-5xl mx-auto mt-8"
        columns={{ xxs: 4, xs: 8, sm: 12, md: 12 }}
      >
        {chats.length > 0 ? (
          <>
            <Grid item xxs={1} xs={4} sm={3} md={3} className="border border-gray-200">
              <ChatListSearch />
              <Divider />
              <Box sx={{ padding: 2, overflowY: 'auto', maxHeight: 640 }}>
                {chats.map((chat, i) => (
                  <Chat key={i} connectedUsers={connectedUsers} chat={chat} />
                ))}
              </Box>
            </Grid>
            <Grid item xxs={3} xs={4} sm={9} md={9} className="border border-gray-200">
              <Box className={classes.box}>
                <Banner bannerData={bannerData} />
                <Divider />
                <Box className={classes.listMessage}>
                  {messages.length > 0 &&
                    messages.map((message, i) => (
                      <Message
                        divRef={divRef}
                        key={i}
                        bannerProfilePic={bannerData.avatar}
                        message={message}
                        user={currentUser}
                      />
                    ))}
                </Box>
                <MessageInputField sendMsg={sendMsg} />
              </Box>
            </Grid>
          </>
        ) : (
          <p>No Messages</p>
        )}
      </Grid>
    </>
  );
}

Messages.getInitialProps = async (ctx) => {
  try {
    const res = await chatService.getChats();

    return { chatsData: res.data.messages };
  } catch (error) {
    return { errorLoading: true };
  }
};
