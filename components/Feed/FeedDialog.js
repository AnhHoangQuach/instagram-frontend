import { Dialog, Button, Divider, Link, Zoom } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialogScrollPaper: {
    display: 'grid !important',
    gridTemplateColumns: 'minmax(auto, 496px) !important',
  },
}));

export default function FeedDialog({ onClose }) {
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
      <Button className="normal-case text-red-700 font-semibold py-3">Unfollow</Button>
      <Divider />
      <Button className="normal-case py-3">
        <Link href="/login" underline="none">
          Go to post
        </Link>
      </Button>
      <Divider />
      <Button className="normal-case py-3">Share</Button>
      <Divider />
      <Button className="normal-case py-3">Copy Link</Button>
      <Divider />
      <Button className="normal-case py-3" onClick={onClose}>
        Cancel
      </Button>
    </Dialog>
  );
}
