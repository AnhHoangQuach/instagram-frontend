import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { closeMessage } from '../../store/messageSlice';

function Message() {
  const dispatch = useDispatch();
  const { open, duration, message, type, variant } = useSelector((state) => state.message);

  const handleClose = () => {
    dispatch(closeMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} variant={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Message;
