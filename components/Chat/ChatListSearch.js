import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  searchMessage: {
    [theme.breakpoints.down('xs')]: {
      display: 'none !important',
    },
  },
}));

function ChatListSearch({ chats, setChats }) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState();
  return (
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
  );
}

export default ChatListSearch;
