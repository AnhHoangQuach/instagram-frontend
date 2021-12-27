import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    color: '#8e8e8e',
    fontSize: '0.75rem',
  },
}));

function ChatListSearch() {
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const classes = useStyles();
  return (
    <Box sx={{ padding: 2, overflowY: 'auto', maxHeight: 540 }}>
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
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="body2">anhhoang362k</Typography>
            <Typography variant="body2" className={classes.typography}>
              Active {i}h ago
            </Typography>
          </Box>
          <RemoveCircleOutlineOutlinedIcon className="flex-1 mx-4" />
        </Box>
      ))}
    </Box>
  );
}

export default ChatListSearch;
