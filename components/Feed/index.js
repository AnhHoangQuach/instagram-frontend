import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import FeedComment from './FeedComment';
import FeedImage from './FeedImage';
import DialogCommon from '../DialogCommon';
import {
  Avatar,
  Typography,
  Box,
  Button,
  Hidden,
  Divider,
  Card,
  CardMedia,
  CardHeader,
  Skeleton,
} from '@mui/material';
import { postService } from '../../services/post';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { MessageIcon } from '../../utils/icons';
import { LikeButton, SaveButton } from '../Feed/FeedAction';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { setMessage } from '../../store/messageSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const FeedSkeleton = () => {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
        title={<Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" width="40%" height={10} />}
      />
      <CardMedia style={{ height: 400 }}>
        <Skeleton variant="rect" height="100%" />
      </CardMedia>
      <Divider />
      <Typography style={{ padding: '8px 12px 4px' }}>
        <Skeleton />
      </Typography>
      <Typography style={{ padding: '4px 12px 8px' }}>
        <Skeleton />
      </Typography>
    </Card>
  );
};

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCaption, setCaption] = useState(false);
  const [showOptionsDialog, setOptionsDialog] = useState(false);
  const [postIdNow, setPostIdNow] = useState(null);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const getFeedPosts = async () => {
    try {
      setLoading(true);
      const postRes = await postService.getFeedPosts({ page, limit: 2 });
      if (postRes.status === 'success') {
        setLoading(false);
        return postRes.data.posts;
      }
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  const fetchData = async () => {
    const postsFormServer = await getFeedPosts();

    setPosts([...posts, ...postsFormServer]);
    if (postsFormServer.length === 0 || postsFormServer.length < 5) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postRes = await postService.getFeedPosts({ page: 1, limit: 2 });
        if (postRes.status === 'success') {
          setPosts([...posts, ...postRes.data.posts]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
      }
    };
    fetchPosts();
  }, []);

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

  const callback = useCallback((loading) => {
    setLoading(loading);
    setTimeout(async () => {
      getFeedPosts();
    }, 1000);
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={loading && <FeedSkeleton />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {posts.map((post) => (
        <div className="rounded-sm my-7 border" key={post._id}>
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center">
              <Link href={`/profile/${post.user._id}`} passHref>
                <Avatar src={post.user.avatar} className="cursor-pointer" />
              </Link>
              <Typography variant="subtitle2" className="font-light mx-4">
                {post.user.username}
              </Typography>
            </div>
            <MoreHorizIcon
              className="cursor-pointer"
              onClick={() => {
                setPostIdNow(post._id);
                setOptionsDialog(true);
              }}
            />
          </div>
          <Carousel responsive={responsive} showDots={true} keyBoardControl={true}>
            {post.images.map((item) =>
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
          <Box m={1}>
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <LikeButton
                  postId={post._id}
                  isVotedPost={post.likes.find((ele) => ele.user === currentUser?._id)}
                  likes={post.likes.length}
                  isOnly={false}
                />
                <MessageIcon />
                <ShareOutlinedIcon />
              </div>
              <SaveButton
                postId={post._id}
                isBookmarked={currentUser?.savedPosts.includes(post._id)}
              />
            </div>
            <Box mt={1}>
              {/* <Typography variant="subtitle2" className="font-semibold">
                  {post.likes.length === 1 ? '1 like' : `${post.likes.length} likes`}
                </Typography> */}
              <div className={showCaption ? 'block' : 'flex items-center'}>
                <Link href="/" passHref>
                  <Typography variant="subtitle2" component="span" className="mr-1 font-semibold">
                    {post.user.username}
                  </Typography>
                </Link>
                {showCaption ? (
                  <Typography
                    variant="body2"
                    component="span"
                    dangerouslySetInnerHTML={{ __html: post.caption }}
                  />
                ) : (
                  <div className="flex items-center break-all text-sm">
                    <HTMLEllipsis
                      unsafeHTML={post.caption}
                      maxLine="0"
                      ellipsis="..."
                      basedOn="letters"
                    />
                    <Button
                      className="lowercase text-gray-400 p-0"
                      onClick={() => setCaption(true)}
                    >
                      more
                    </Button>
                  </div>
                )}
              </div>
            </Box>
            <Link href={`/post/${post._id}`} passHref>
              <Typography variant="body2" component="div" className="text-gray-400 cursor-pointer">
                {post.comment.commentCount && `View all ${post.comment.commentCount} comments`}
              </Typography>
            </Link>
            {post.comment.comments.slice(-2).map((item) => (
              <div key={item._id}>
                <Typography variant="subtitle2" component="span" className="font-semibold">
                  {item.user.username}
                </Typography>{' '}
                <Typography variant="body2" component="span">
                  {item.content}
                </Typography>
              </div>
            ))}
            <Typography color="textSecondary" className="py-2" style={{ fontSize: '0.75rem' }}>
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
          <Hidden xsDown>
            <Divider />
            <FeedComment postId={post._id} parentCallback={callback} />
          </Hidden>
          {showOptionsDialog && (
            <DialogCommon onClose={() => setOptionsDialog(false)}>
              <Button className="normal-case text-red-700 font-semibold">Unfollow</Button>
              <Divider />
              <Button className="normal-case">
                <Link href={`/post/${postIdNow}`} underline="none">
                  Go to post
                </Link>
              </Button>
              <Divider />
              <Button className="normal-case">Share</Button>
              <Divider />
              <Button className="normal-case">Copy Link</Button>
            </DialogCommon>
          )}
        </div>
      ))}
    </InfiniteScroll>
  );
}
