import React from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Avatar, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    maxHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function ChatForm() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Box className={classes.box}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
        <Avatar />
        <Typography variant="body1" className="mx-2">
          anhhoang362k
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ overflowY: 'auto', height: 500 }}></Box>
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
  );
}

export default ChatForm;
