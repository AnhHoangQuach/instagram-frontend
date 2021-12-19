import { useState, useRef, useEffect } from 'react';
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
import { CommentIcon } from '../../utils/icons';
import UserCard from '../../components/PostDetails/UserCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Seo from '../../components/Seo';
import DialogCommon from '../../components/DialogCommon';
import Header from '../../components/Header';
import { postService } from '../../services/post';
import { commentService } from '../../services/comment';
import { LikeButton, SaveButton } from '../../components/Feed/FeedAction';
import { useRouter } from 'next/router';
import FeedImage from '../../components/Feed/FeedImage';
import Carousel from 'react-multi-carousel';
import { setMessage } from '../../store/messageSlice';
import 'react-multi-carousel/lib/styles.css';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

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
    padding: '0 1rem !important',
  },
  root: {
    fontSize: '0.75rem !important',
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
    width: '3rem !important',
    padding: 'unset !important',
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;
  //state
  const { currentUser } = useSelector((state) => state.user);
  const [showOptionsDialog, setOptionsDialog] = useState(false);

  const [postDetail, setPostDetail] = useState();
  //comment
  const [content, setContent] = useState('');
  const [isLoading, setLoading] = useState(false);
  const commentRef = useRef(null);
  const isMatchPhone = useMediaQuery(theme.breakpoints.down('sm'));

  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const handleCreateComment = () => {
    handleSubmit(async ({ content }) => {
      setLoading(true);
      try {
        const commentRes = await commentService.createComment({ postId: id }, content);
        if (commentRes.status === 'success') {
          dispatch(setMessage('Comment created successfully'));
        }
        setLoading(false);
        setContent('');
        commentRef.current.focus();
      } catch (error) {
        setLoading(false);
        dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
      }
    })();
  };

  //post
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    try {
      setLoading(true);
      const postRes = await postService.getPostByID({ postId: id });
      if (postRes.status === 'success') {
        setPostDetail(postRes.data.post);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  }, []);

  return (
    !isLoading && (
      <>
        <Seo title="Post Details" description="Post Details" />
        <Header />
        <Grid container className="max-w-5xl mx-auto mt-8">
          <Box className={classes.postContainer}>
            <Box className={classes.article}>
              {/* Post Header */}
              <div className={classes.postHeader}>
                <UserCard user={postDetail?.user} avatarSize={32} />
                <MoreHorizIcon className="cursor-pointer" onClick={() => setOptionsDialog(true)} />
              </div>
              {/* Post Image */}
              <Carousel
                responsive={responsive}
                showDots={true}
                keyBoardControl={true}
                className={classes.postImage}
              >
                {postDetail?.images.map((item) =>
                  item.format === 'jpg' || item.format === 'png' || item.format === 'gif' ? (
                    <FeedImage key={item.url} img={item.url} />
                  ) : (
                    <video
                      src={item.url}
                      key={item.url}
                      className="object-contain h-full mx-auto"
                      controls
                    />
                  )
                )}
              </Carousel>
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
                  <ShareOutlinedIcon />
                  <SaveButton
                    postId={postDetail?._id}
                    isBookmarked={currentUser?.savedPosts.includes(postDetail?._id)}
                  />
                </div>
                <Typography className={classes.likes} variant="subtitle2">
                  <span>
                    {postDetail?.likes.length === 1
                      ? '1 like'
                      : `${postDetail?.likes.length} likes`}
                  </span>
                </Typography>
                <div className={classes.postCaptionContainer}>
                  <div className="flex my-4">
                    <Avatar src={postDetail?.user.avatar} alt="" />
                    <div className="pl-4">
                      <Typography
                        variant="body2"
                        className="font-semibold"
                        component="span"
                        dangerouslySetInnerHTML={{
                          __html: `${postDetail?.user.username} ${postDetail?.caption}`,
                        }}
                      />
                      <div style={{ fontSize: 12 }}>{moment(postDetail?.createdAt).fromNow()}</div>
                    </div>
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
                        <div style={{ fontSize: 12 }}>{moment(comment.createdAt).fromNow()}</div>
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
                    <Controller
                      name="content"
                      defaultValue=""
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          {...field}
                          size={isMatchPhone ? 'small' : 'medium'}
                          name="content"
                          inputRef={commentRef}
                          fullWidth
                          placeholder="Add a comment..."
                          multiline
                          rows={1}
                          InputProps={{
                            classes: {
                              root: classes.root,
                              notchedOutline: classes.noBorder,
                            },
                          }}
                          required
                          error={invalid}
                          helperText={error?.message}
                        />
                      )}
                    />
                    <Button
                      color="primary"
                      className={classes.commentButton}
                      disabled={!content.trim()}
                      onClick={handleCreateComment}
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
    )
  );
}
