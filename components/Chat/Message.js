import { useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
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

function Message({ message, user, bannerProfilePic, divRef }) {
  const classes = useStyles();
  const [deleteIcon, showDeleteIcon] = useState(false);

  const ifYouSender = message.sender === user._id;
  return (
    <div
      ref={divRef}
      className={`${classes.message} ${ifYouSender ? classes.darker : classes.messageReverse}`}
    >
      <Avatar src={ifYouSender ? user.avatar : bannerProfilePic} />
      <Typography variant="body1" className="px-2 break-all">
        {message.msg}
      </Typography>
      <span className={ifYouSender ? classes.timeRight : classes.timeLeft}>
        {moment(message.createdAt).format('HH:mm')}
      </span>
    </div>
  );
}

export default Message;
