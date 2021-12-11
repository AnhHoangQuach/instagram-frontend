import { useState, useRef } from 'react';
import {
  Grid,
  Box,
  Typography,
  useMediaQuery,
  Divider,
  Button,
  TextField,
  Avatar,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import {
  LikeIcon,
  UnlikeIcon,
  CommentIcon,
  ShareIcon,
  RemoveIcon,
  SaveIcon,
} from '../../utils/icons';
import UserCard from '../../components/PostDetails/UserCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Seo from '../../components/Seo';
import DialogCommon from '../../components/DialogCommon';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';

export const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
  },
  postButtons: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '24px 24px 24px minmax(24px, auto)',
    gridGap: 16,
    order: 2,
    padding: '6px 16px 0 !important',
  },
  datePosted: {
    fontSize: '10px !important',
    order: 4,
    padding: '6px 16px !important',
  },
  comment: {
    order: 5,
  },
  likes: {
    fontWeight: '600 !important',
    order: 3,
    padding: '0 16px !important',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  like: {
    animation: '$like-button-animation 0.45s',
    animationTimingFunction: 'ease-in-out',
    transform: 'scale(1)',
  },
  liked: {
    animation: '$liked-button-animation 0.45s',
    animationTimingFunction: 'ease-in-out',
    transform: 'scale(1)',
  },
  '@keyframes like-button-animation': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.2)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes liked-button-animation': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.2)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  },
  root: {
    fontSize: '14px !important',
  },
  noBorder: {
    border: 'none',
  },
  commentContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto minmax(auto, 56px)',
  },
  commentButton: {
    width: '48px !important',
    padding: 'unset !important',
  },
  saveIcon: {
    justifySelf: 'right',
  },
  postContainer: {
    background: '#fff',
    width: '100%',
  },
  article: {
    display: 'flex',
    border: '1px solid rgba(var(--b6a,219,219,219),1)',
    borderBottomRightRadius: '3px',
    borderTopRightRadius: '3px',
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
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
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      position: 'relative !important',
    },
  },
  postImage: {
    display: 'flex',
    width: 'calc(100% - 335px)',
    [theme.breakpoints.down('sm')]: {
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
  postButtonsWrapper: {
    borderLeft: '1px solid rgba(var(--ce3,239,239,239),1)',
    bottom: '0',
    boxSizing: 'border-box',
    position: 'absolute',
    flexDirection: 'column',
    display: 'flex',
    right: '0',
    top: '72px',
    width: '335px',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      position: 'relative !important',
      top: '0px !important',
    },
  },
  postCaptionContainer: {
    padding: '1rem',
    margin: '0 0 auto !important',
    order: 1,
    overflowX: 'hidden',
    flexGrow: 1,
    overflow: 'hidden',
  },
}));

export default function PostDetail() {
  const classes = useStyles();
  const theme = useTheme();
  //comment
  const [content, setContent] = useState('');
  const commentRef = useRef(null);
  const isMatchPhone = useMediaQuery(theme.breakpoints.down('sm'));

  //state
  const { currentUser } = useSelector((state) => state.user);
  const [showOptionsDialog, setOptionsDialog] = useState(false);

  //post
  const [caption, setCaption] = useState(
    'xin chao moi nguoi xin chao moi nguoi xin chao moi nguoixin chao moi nguoixin chao moi nguoixin chao moi nguoi'
  );
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([
    {
      username: 'test',
      content: 'hellohellohell ohellohellohelloh ellohellohellohello hellohellohellohellohello',
    },
    { username: 'tes1t', content: 'hello1' },
  ]);
  return (
    <>
      <Seo title="Post Details" description="Post Details" />
      <Header />
      <Grid container className="max-w-5xl mx-auto mt-8">
        <Box className={classes.postContainer}>
          <Box className={classes.article}>
            {/* Post Header */}
            <div className={classes.postHeader}>
              <UserCard user={currentUser} avatarSize={32} />
              <MoreHorizIcon className="cursor-pointer" onClick={() => setOptionsDialog(true)} />
            </div>
            {/* Post Image */}
            <div className={classes.postImage}>
              <img src={currentUser?.avatar} alt="Post media" className={classes.image} />
            </div>
            {/* Post Buttons */}
            <div className={classes.postButtonsWrapper}>
              <div className={classes.postButtons}>
                <LikeButton />
                <CommentIcon
                  onClick={() => {
                    commentRef.current.focus();
                  }}
                  className="cursor-pointer"
                />
                <ShareIcon />
                <SaveButton />
              </div>
              <Typography className={classes.likes} variant="subtitle2">
                <span>{likes === 1 ? '1 like' : `${likes} likes`}</span>
              </Typography>
              <div className={classes.postCaptionContainer}>
                <div className="flex my-4">
                  <Avatar src="/assets/images/45851733.png" alt="" />
                  <Typography
                    className="pl-4"
                    variant="body2"
                    component="span"
                    dangerouslySetInnerHTML={{ __html: `${currentUser?.username} ${caption}` }}
                  />
                </div>
                {comments.map((comment) => (
                  <Box className="flex my-4" key={comment.username}>
                    <Avatar src="/assets/images/45851733.png" alt="" />
                    <div className="pl-4">
                      <div>
                        <Typography variant="body2" component="span">
                          {comment.username} {comment.content}
                        </Typography>{' '}
                      </div>
                      <div style={{ fontSize: 12 }}>1w</div>
                    </div>
                  </Box>
                ))}
              </div>
              <Typography color="textSecondary" className={classes.datePosted}>
                5 DAYS AGO
              </Typography>
              <div className={classes.comment}>
                <Divider />
                <div className={classes.commentContainer}>
                  <TextField
                    size={isMatchPhone ? 'small' : 'medium'}
                    inputRef={commentRef}
                    fullWidth
                    value={content}
                    placeholder="Add a comment..."
                    multiline
                    rows={1}
                    onChange={(event) => setContent(event.target.value)}
                    InputProps={{
                      classes: {
                        root: classes.root,
                        notchedOutline: classes.noBorder,
                      },
                    }}
                  />
                  <Button
                    color="primary"
                    className={classes.commentButton}
                    disabled={!content.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </Box>
          {showOptionsDialog && (
            <DialogCommon onClose={() => setOptionsDialog(false)}>
              <Button className="normal-case text-red-700 font-semibold">Unfollow</Button>
              <Divider />
              <Button className="normal-case">Share To</Button>
              <Divider />
              <Button className="normal-case">Copy Link</Button>
            </DialogCommon>
          )}
        </Box>
      </Grid>
    </>
  );
}

function LikeButton() {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;

  function handleLike() {
    setLiked(true);
  }

  function handleUnlike() {
    setLiked(false);
  }

  return <Icon className={className} onClick={onClick} />;
}

function SaveButton() {
  const classes = useStyles();
  const [saved, setSaved] = useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave;

  function handleSave() {
    setSaved(true);
  }

  function handleRemove() {
    setSaved(false);
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}
