import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LikeIcon, CommentIcon } from '../../utils/icons';
import FilterOutlinedIcon from '@mui/icons-material/FilterOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import FeedImage from '../Feed/FeedImage';
import Link from 'next/link';

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
    zIndex: 2,
    justifyContent: 'space-evenly',
    '&:hover': {
      background: 'rgba(0,0,0,0.4)',
      cursor: 'pointer',
      '& > div': {
        opacity: 1,
      },
    },
  },
  gridPostInfo: {
    color: '#fff',
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: 5,
    placeItems: 'center',
    opacity: 0,
  },
  typePost: {
    color: '#fff',
    position: 'absolute',
    top: '5%',
    fontSize: '1.5rem',
    right: '5%',
  },
  sizeTypeIcon: {
    fontSize: '1.5rem',
  },
}));

export default function GridPost({ post }) {
  const classes = useStyles();
  return (
    post && (
      <Link href={`/post/${post._id}`} passHref>
        <Box sx={{ position: 'relative' }}>
          <div className={classes.gridPostOverlay}>
            <div className={classes.typePost}>
              {post.images[0].format === 'jpg' ||
              post.images[0].format === 'png' ||
              post.images[0].format === 'gif' ? (
                <FilterOutlinedIcon className={classes.sizeTypeIcon} />
              ) : (
                <PlayCircleOutlineOutlinedIcon className={classes.sizeTypeIcon} />
              )}
            </div>
            <div className={classes.gridPostInfo}>
              <LikeIcon fill="#fff" />
              <Typography variant="subtitle2" className="font-semibold">
                {post?.likes.length}
              </Typography>
            </div>
            <div className={classes.gridPostInfo}>
              <CommentIcon fill="#fff" />
              <Typography variant="subtitle2" className="font-semibold">
                {post?.comments.length || post?.comments}
              </Typography>
            </div>
          </div>
          <div>
            {post.images[0].format === 'jpg' ||
            post.images[0].format === 'png' ||
            post.images[0].format === 'gif' ? (
              <FeedImage key={post.images[0].url} img={post.images[0].url} />
            ) : (
              <video
                src={post.images[0].url}
                key={post.images[0].url}
                className="object-contain h-full mx-auto"
                controls
              />
            )}
          </div>
        </Box>
      </Link>
    )
  );
}
