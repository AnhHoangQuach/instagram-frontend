import { Dialog, Button, Divider, Zoom } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialogScrollPaper: {
    display: 'grid !important',
    gridTemplateColumns: 'minmax(auto, 496px) !important',
  },
}));

export default function DialogCommon({ onClose, children }) {
  const classes = useStyles();
  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      {children}
      <Divider />
      <Button className="normal-case" onClick={onClose}>
        Cancel
      </Button>
    </Dialog>
  );
}
