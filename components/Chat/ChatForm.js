import React from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Avatar, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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

function ChatForm() {
  const classes = useStyles();
  const router = useRouter();
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
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
  );
}

export default ChatForm;
