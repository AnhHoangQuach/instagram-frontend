import { useState, useEffect } from 'react';
import { TextField, Box, Autocomplete, Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import { systemService } from '../../services/system';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  searchMessage: {
    [theme.breakpoints.down('xs')]: {
      display: 'none !important',
    },
  },
}));

function ChatListSearch({ chats, setChats }) {
  const classes = useStyles();
  const router = useRouter();
  const [results, setResults] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const addChat = (result) => {
    const alreadyInChat =
      chats.length > 0 && chats.filter((chat) => chat.messagesWith === result._id).length > 0;

    if (alreadyInChat) {
      return router.push(`/messages?message=${result._id}`);
    } else {
      const newChat = {
        messagesWith: result._id,
        username: result.username,
        avatar: result.avatar,
        lastMessage: '',
        createdAt: Date.now(),
      };

      setChats((prev) => [newChat, ...prev]);
      router.push(`/messages?message=${result._id}`);
    }
  };

  const handleSearch = async () => {
    const res = await systemService.search({ keywords: '' });
    if (res.status === 'success') {
      setResults(res.data.users);
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Autocomplete
      disablePortal
      className={`p-2 ${classes.searchMessage}`}
      options={results}
      renderOption={(props, option) =>
        option._id !== currentUser._id && (
          <Box component="li" key={option._id} {...props}>
            <Avatar src={option.avatar} />
            <Typography className="ml-2">{option.username}</Typography>
          </Box>
        )
      }
      onChange={(event, value) => {
        addChat(value);
      }}
      getOptionLabel={(option) => option.username}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" size="small" label="Search" />
      )}
    />
  );
}

export default ChatListSearch;
