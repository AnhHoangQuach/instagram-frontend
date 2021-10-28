import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const useStyles = makeStyles((theme) => ({
  gridPostOverlay: {
    [theme.breakpoints.down('xs')]: {
      gridAutoFlow: 'row',
      alignContent: 'space-evenly',
    },
    position: 'absolute',
    display: 'grid',
    placeItems: 'center',
    gridAutoFlow: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    '&:hover': {
      background: 'rgba(0,0,0,0.6)',
      cursor: 'pointer',
      '& > div': {
        opacity: 1,
      },
    },
  },
  gridPostInfo: {
    color: '#ffffff',
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: 5,
    placeItems: 'center',
    opacity: 0,
  },
}));

export default function GridPost({ post }) {
  const classes = useStyles();
  return (
    <Box sx={{ position: 'relative' }}>
      <div className={classes.gridPostOverlay}>
        <div className={classes.gridPostInfo}>
          <FavoriteBorderOutlinedIcon />
          <Typography>{post.id}</Typography>
        </div>
        <div className={classes.gridPostInfo}>
          <ChatBubbleOutlineOutlinedIcon />
          <Typography>{post.posts.length}</Typography>
        </div>
      </div>
      <img src={post.image} className={classes.image} />
    </Box>
  );
}
