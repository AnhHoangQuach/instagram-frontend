import { useState } from 'react';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import ChatForm from '../../components/Chat/ChatForm';
import ChatListSearch from '../../components/Chat/ChatListSearch';
import { Grid, Divider, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Message({ chatsData }) {
  const [chats, setChats] = useState(chatsData);
  const [inputValue, setInputValue] = useState();
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
            className="p-2"
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
          <ChatListSearch />
        </Grid>
        <Grid item xxs={3} xs={4} sm={9} md={9} className="border border-gray-200">
          <ChatForm />
        </Grid>
      </Grid>
    </>
  );
}
