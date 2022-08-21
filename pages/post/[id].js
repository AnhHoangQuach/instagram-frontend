import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Grid,
  Box,
  Typography,
  useMediaQuery,
  Divider,
  Button,
  TextField,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { CommentIcon } from '../../utils/icons';
import UserCard from '../../components/PostDetails/UserCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import DialogCommon from '../../components/DialogCommon';
import { postService } from '../../services/post';
import { userService } from '../../services/user';
import { commentService } from '../../services/comment';
import { LikeButton, SaveButton } from '../../components/Feed/FeedAction';
import { useRouter } from 'next/router';
import FeedImage from '../../components/Feed/FeedImage';
import Carousel from 'react-multi-carousel';
import { setMessage } from '../../store/messageSlice';
import 'react-multi-carousel/lib/styles.css';
import moment from 'moment';
import Link from 'next/link';
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
    overflow: 'scroll',
  },
  deleteComment: {
    fontSize: '0.75rem',
    margin: '0 0.5rem',
    cursor: 'pointer',
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
  const [isLoading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const commentRef = useRef(null);
  const lastCommentRef = useRef(null);
  const isMatchPhone = useMediaQuery(theme.breakpoints.down('sm'));

  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const handleCreateComment = (e) => {
    handleSubmit(async ({ content }) => {
      e.preventDefault();
      try {
        setCommentLoading(true);
        const commentRes = await commentService.createComment({ postId: id, content });
        if (commentRes.status === 'success') {
          dispatch(setMessage({ type: 'success', message: commentRes.message }));
          try {
            const postRes = await postService.getPostByID({ postId: id });
            if (postRes.status === 'success') {
              setPostDetail(postRes.data.post);
              setPostComments(postRes.data.comment);
            }
          } catch (error) {
            dispatch(
              setMessage({ type: 'error', message: error.response?.data.message || error.message })
            );
          }
        }
        setCommentLoading(false);
      } catch (error) {
        setCommentLoading(false);
        dispatch(
          setMessage({ type: 'error', message: error.response?.data.message || error.message })
        );
      }
      reset({ content: '' });
      commentRef.current.focus();
    })(e);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const commentRes = await commentService.deleteComment({ commentId });
      if (commentRes.status === 'success') {
        dispatch(setMessage({ type: 'success', message: commentRes.message }));
        try {
          const postRes = await postService.getPostByID({ postId: id });
          if (postRes.status === 'success') {
            setPostDetail(postRes.data.post);
            setPostComments(postRes.data.comment);
          }
        } catch (error) {
          dispatch(
            setMessage({ type: 'error', message: error.response?.data.message || error.message })
          );
        }
      }
    } catch (error) {
      dispatch(
        setMessage({ type: 'error', message: error.response?.data.message || error.message })
      );
    }
  };

  const handleShareLink = () => {
    navigator.clipboard
      .writeText(document.URL)
      .then(() => dispatch(setMessage({ type: 'success', message: 'Link copied to clipboard' })))
      .catch(() =>
        dispatch(setMessage({ type: 'success', message: 'Could not copy link to clipboard.' }))
      )
      .finally(() => {
        setOptionsDialog(false);
      });
  };

  const handleDeletePost = async (postIdNow) => {
    try {
      const res = await postService.deletePost({ postId: postIdNow });
      if (res.status === 'success') {
        dispatch(setMessage({ type: 'success', message: res.message }));
        setOptionsDialog(false);
        router.replace('/');
      }
    } catch (error) {
      dispatch(
        setMessage({ type: 'error', message: error.response?.data.message || error.message })
      );
      setOptionsDialog(false);
    }
  };

  const handleUnfollowUser = async (userId) => {
    try {
      const res = await userService.unfollowUser({ userId });
      if (res.status === 'success') {
        dispatch(setMessage({ type: 'success', message: res.message }));
      }
    } catch (error) {
      dispatch(
        setMessage({ type: 'error', message: error.response?.data.message || error.message })
      );
    }
  };

  //post
  const [postComments, setPostComments] = useState([]);
  const [likesCount, setLikesCount] = useState();

  const getPostDetail = async () => {
    try {
      setLoading(true);
      const postRes = await postService.getPostByID({ postId: id });
      if (postRes.status === 'success') {
        setPostDetail(postRes.data.post);
        setPostComments(postRes.data.comment);
        setLikesCount(postRes.data.post.likes.length);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(
        setMessage({ type: 'error', message: error.response?.data.message || error.message })
      );
    }
  };

  useEffect(() => {
    getPostDetail();
  }, [id]);

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [postComments]);

  const callback = useCallback((likesCount) => {
    setLikesCount(likesCount);
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
                  <LikeButton
                    postId={postDetail?._id}
                    isVotedPost={postDetail?.likes.find((ele) => ele.user === currentUser?._id)}
                    parentCallback={callback}
                    likes={likesCount}
                  />
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
                <Typography className={classes.likes} variant="subtitle2" component="span">
                  {likesCount === 1 ? '1 like' : `${likesCount} likes`}
                </Typography>
                <div className={classes.postCaptionContainer}>
                  <div className="flex my-4">
                    <Link href={`/profile/${postDetail?.user._id}`} passHref>
                      <Avatar src={postDetail?.user.avatar} alt="" className="cursor-pointer" />
                    </Link>
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
                  <Box ref={lastCommentRef}>
                    {postComments?.comments?.map((comment) => (
                      <Box className="flex my-4" key={comment._id}>
                        <Avatar src={comment.user.avatar} alt="" />
                        <div className="pl-4">
                          <Typography
                            variant="body2"
                            component="span"
                            className="font-semibold mr-1"
                          >
                            {comment.user.username}
                          </Typography>
                          <Typography variant="body2" component="span">
                            {comment.content}
                          </Typography>
                          <div style={{ fontSize: 12, color: '#8e8e8e' }}>
                            {moment(comment.createdAt).fromNow()}
                            {comment.user._id === currentUser?._id && (
                              <span
                                className={classes.deleteComment}
                                onClick={() => handleDeleteComment(comment._id)}
                              >
                                Delete
                              </span>
                            )}
                          </div>
                        </div>
                      </Box>
                    ))}
                  </Box>
                </div>
                <Typography color="textSecondary" className={classes.datePosted}>
                  {moment(postDetail?.createdAt).fromNow()}
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
                          placeholder="Add a comment..."
                          multiline
                          rows={1}
                          required
                          error={invalid}
                          helperText={error?.message}
                        />
                      )}
                    />
                    <Button
                      color="primary"
                      className={classes.commentButton}
                      onClick={handleCreateComment}
                      disabled={commentLoading}
                    >
                      {commentLoading && <CircularProgress size="1rem" className="m-1" />}
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
            {showOptionsDialog && (
              <DialogCommon onClose={() => setOptionsDialog(false)}>
                {currentUser._id !== postDetail.user._id ? (
                  <>
                    <Button className="normal-case text-red-700 font-semibold">Unfollow</Button>
                    <Divider />
                  </>
                ) : (
                  <>
                    <Button
                      className="normal-case text-red-700 font-semibold"
                      onClick={() => handleDeletePost(postDetail._id)}
                    >
                      Delete Post
                    </Button>
                    <Divider />
                  </>
                )}
                <Button className="normal-case" onClick={handleShareLink}>
                  Copy Link
                </Button>
              </DialogCommon>
            )}
          </Box>
        </Grid>
      </>
    )
  );
}
