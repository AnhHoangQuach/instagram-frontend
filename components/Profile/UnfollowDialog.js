import { Dialog, Typography, Avatar, Divider, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  unfollowDialogScrollPaper: {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 496px)',
  },
}));

export default function UnfollowDialog({ onClose }) {
  const classes = useStyles();

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper,
      }}
      onClose
      TransitionComponent={Zoom}
    >
      <Box
        sx={{
          display: 'grid',
          justifyContent: 'center',
          padding: '32px 16px 16px',
        }}
      >
        <Avatar src="/assets/images/45851733.png" alt="" sx={{ width: 90, height: 90 }} />
      </Box>
      <Typography align="center" variant="body2">
        Unfollow @hoanganh?
      </Typography>
      <Divider />
      <Button>Unfollow</Button>
      <Divider />
      <Button onClick={onClose}>Cancel</Button>
    </Dialog>
  );
}
