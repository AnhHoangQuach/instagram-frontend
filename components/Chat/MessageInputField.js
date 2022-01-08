import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

function MessageInputField({ sendMsg }) {
  const [text, setText] = useState('');
  const handleSendMessage = () => {
    sendMsg(text);
    setText('');
  };

  return (
    <Box sx={{ position: 'sticky', display: 'flex', bottom: 0 }}>
      <TextField
        type="search"
        placeholder="Search"
        variant="outlined"
        size="small"
        value={text}
        className="w-full dark:bg-white"
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <Button color="primary" onClick={handleSendMessage}>
        Post
      </Button>
    </Box>
  );
}

export default MessageInputField;
