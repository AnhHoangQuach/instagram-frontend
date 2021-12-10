import { Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import UserCard from '../../components/PostDetails/UserCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Seo from '../../components/Seo';
import Header from '../../components/Header';

const useStyles = makeStyles((theme) => ({
  post: {
    display: 'flex',
    border: '1px solid rgba(var(--b6a,219,219,219),1)',
    borderBottomRightRadius: '3px',
    borderTopRightRadius: '3px',
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    padding: '4vh 1.25rem 0',
  },
  postHeader: {
    borderLeft: '1px solid rgba(var(--ce3,239,239,239),1)',
    borderBottom: '1px solid rgba(var(--ce3,239,239,239),1)',
    height: '72px',
    padding: '16px',
    right: '0',
    width: '335px',
    display: 'flex',
    top: 0,
    position: 'absolute',
    marginRight: '0px !important',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      width: '100% !important',
      position: 'relative !important',
    },
  },
  postImage: {
    display: 'flex',
    width: 'calc(100% - 335px)',
    [theme.breakpoints.only('xs')]: {
      width: 'initial !important',
      position: 'relative !important',
      margin: '0 auto !important',
      textAlign: 'center',
      '& img': {
        maxHeight: '200px !important',
        maxWidth: '200px !important',
        objectFit: 'contain !important',
      },
    },
  },
}));

export default function PostDetail() {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [showOptionsDialog, setOptionsDialog] = useState(false);
  return (
    <>
      <Seo title="Post Details" description="Post Details" />
      <Header />
      <Grid container className="max-w-5xl mx-auto mt-8">
        <Box className={classes.post}>
          {/* Post Header */}
          <div className={classes.postHeader}>
            <UserCard user={currentUser} avatarSize={32} />
            <MoreHorizIcon onClick={() => setOptionsDialog(true)} />
          </div>
          {/* Post Image */}
          <div className={classes.postImage}>
            <img src="/assets/images/45851733.png" alt="Post media" style={{ width: '100%' }} />
          </div>
        </Box>
      </Grid>
    </>
  );
}
