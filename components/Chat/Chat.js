import { useState } from 'react';
import { Box, Avatar, Badge, Typography } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'isOnline',
})(({ theme, isOnline }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: isOnline ? '#44b700' : '#d3d3d3',
    color: isOnline ? '#44b700' : '#d3d3d3',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const useStyles = makeStyles((theme) => ({
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
}));

function Chat({ connectedUsers, chat }) {
  const classes = useStyles();
  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length > 0;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0',
      }}
    >
      <StyledBadge
        isOnline={isOnline}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="" src={chat.avatar} />
      </StyledBadge>
      <Box className={classes.infoMessage}>
        <Typography variant="body2">{chat.username}</Typography>
        <Typography variant="body2" className={classes.typography}>
          Active 1h ago
        </Typography>
      </Box>
      <RemoveCircleOutlineOutlinedIcon className="flex-1 mx-4" />
    </Box>
  );
}

export default Chat;
