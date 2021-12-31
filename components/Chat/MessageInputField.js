import { Box, Typography, Button, TextField } from '@mui/material';

function MessageInputField({ sendMsg }) {
  return (
    <Box sx={{ position: 'sticky', display: 'flex', bottom: 0 }}>
      <TextField
        type="search"
        placeholder="Search"
        variant="outlined"
        size="small"
        className="w-full"
      />
      <Button color="primary">Post</Button>
    </Box>
  );
}

export default MessageInputField;
