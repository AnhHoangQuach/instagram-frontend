import { useState } from 'react';
import { Avatar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import ModalCommon from '../ModalCommon';

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

function Message({ message, user, deleteMsg, bannerProfilePic, divRef }) {
  const classes = useStyles();
  const [deleteIcon, setShowDelete] = useState(false);

  const ifYouSender = message.sender === user?._id;
  return (
    <div
      ref={divRef}
      className={`${classes.message} ${!ifYouSender ? classes.darker : classes.messageReverse}`}
      onClick={() => ifYouSender && setShowDelete(!deleteIcon)}
    >
      <Avatar src={ifYouSender ? user.avatar : bannerProfilePic} />
      <Typography variant="body1" className="px-2 break-all">
        {message.msg}
      </Typography>
      <span className={ifYouSender ? classes.timeRight : classes.timeLeft}>
        {moment(message.createdAt).format('HH:mm')}
      </span>

      {deleteIcon && (
        <ModalCommon
          title="Popup"
          actions={
            <div className="flex w-full justify-end">
              <Button autoFocus onClick={() => setShowDelete(false)}>
                Cancel
              </Button>
              <Button autoFocus onClick={() => deleteMsg(message._id)}>
                Delete
              </Button>
            </div>
          }
          open={deleteIcon}
          onClose={() => setShowDelete(false)}
        >
          Do you want to delete message
        </ModalCommon>
      )}
    </div>
  );
}

export default Message;
