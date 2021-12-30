import { useState, useEffect, useRef } from 'react';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import ChatForm from '../../components/Chat/ChatForm';
import ChatListSearch from '../../components/Chat/ChatListSearch';
import {
  Grid,
  Divider,
  TextField,
  InputAdornment,
  Box,
  Avatar,
  Typography,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { makeStyles } from '@mui/styles';
import { chatService } from '../../services/chat';
import { setMessage } from '../../store/messageSlice';
import { baseUrl } from '../../utils/helpers';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  searchMessage: {
    [theme.breakpoints.down('xs')]: {
      display: 'none !important',
    },
  },
  typography: {
    color: '#8e8e8e',
    fontSize: '0.75rem',
  },
  infoMessage: {
    marginLeft: '1rem',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  listMessage: {
    overflowY: 'auto',
    maxHeight: 640,
    padding: 5,
  },
  message: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    margin: '1rem 0',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    '&:after': {
      content: '',
      clear: 'both',
      display: 'table',
    },
  },
  darker: {
    borderColor: '#ccc',
    backgroundColor: '#ddd',
  },
  messageReverse: {
    flexDirection: 'row-reverse',
  },
  timeRight: {
    color: '#aaa',
  },
  timeLeft: {
    float: 'left',
    color: '#999',
  },
}));

const scrollDivToBottom = (divRef) =>
  divRef.current !== null && divRef.current?.scrollIntoView({ behavior: 'smooth' });

export default function Messages({ chatsData }) {
  const [chats, setChats] = useState(chatsData);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const divRef = useRef();
  const socket = useRef();

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [inputValue, setInputValue] = useState();

  const [bannerData, setBannerData] = useState({ name: '', avatar: '' });
  const openChatId = useRef('');

  const classes = useStyles();
  const dispatch = useDispatch();

  //CONNECTION useEffect
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit('join', { userId: currentUser._id });

      socket.current.on('connected-users', ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
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
          name: data.chat.messagesWith.name,
          avatar: data.chat.messagesWith.avatar,
        });

        openChatId.current = data.chat.messagesWith._id;
        divRef.current && scrollDivToBottom(divRef);
      });

      socket.current.on('no-chat-found', async () => {
        const { name, avatar } = await getUser(router.query.message);

        setBannerData({ name, avatar });
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
        <Grid item xxs={1} xs={4} sm={3} md={3} className="border border-gray-200">
          <TextField
            type="search"
            placeholder="Search"
            variant="outlined"
            size="small"
            className={`p-2 ${classes.searchMessage}`}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Divider />
          <Box sx={{ padding: 2, overflowY: 'auto', maxHeight: 640 }}>
            {test.map((i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                }}
              >
                <Avatar />
                <Box className={classes.infoMessage}>
                  <Typography variant="body2">anhhoang362k</Typography>
                  <Typography variant="body2" className={classes.typography}>
                    Active {i}h ago
                  </Typography>
                </Box>
                <RemoveCircleOutlineOutlinedIcon className="flex-1 mx-4" />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xxs={3} xs={4} sm={9} md={9} className="border border-gray-200">
          <Box className={classes.box}>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
              <Avatar />
              <Typography variant="body1" className="mx-2">
                anhhoang362k
              </Typography>
            </Box>
            <Divider />
            <Box className={classes.listMessage}>
              {test.map((i) => (
                <div
                  className={`${classes.message} ${
                    i % 2 === 0 && `${classes.darker} ${classes.messageReverse}`
                  }`}
                  key={i}
                >
                  <Avatar />
                  <Typography variant="body1" className="px-2 break-all">
                    testtesttesttesttesttesttesttesttest{i}
                  </Typography>
                  <span className={i % 2 === 0 ? classes.timeRight : classes.timeLeft}>11:00</span>
                </div>
              ))}
            </Box>
            <Box className="flex ">
              <TextField
                type="search"
                placeholder="Search"
                variant="outlined"
                size="small"
                className="w-full"
              />
              <Button color="primary">Post</Button>
            </Box>
          </Box>
        </Grid>
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
