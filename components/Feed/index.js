import Link from 'next/link';
import { useState, useEffect } from 'react';
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
import faker from 'faker';
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
  const [comments, setComments] = useState([]);
  const [showOptionsDialog, setOptionsDialog] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(async () => {
    try {
      setLoading(true);
      const postRes = await postService.getPosts({ page: 1, limit: 5, orderBy: 'desc' });
      if (postRes.status === 'success') {
        setPosts(postRes.data.posts);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }

    const comments = [...Array(1)].map((_, i) => ({
      comment: faker.lorem.sentences(),
      id: i,
    }));

    setComments(comments);
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
  return loading ? (
    <FeedSkeleton />
  ) : (
    posts.map((post) => (
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
          <MoreHorizIcon className="cursor-pointer" onClick={() => setOptionsDialog(true)} />
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
              <LikeButton />
              <MessageIcon />
              <ShareOutlinedIcon />
            </div>
            <SaveButton
              postId={post._id}
              isBookmarked={currentUser?.savedPosts.includes(post._id)}
            />
          </div>
          <Box mt={1}>
            <Typography variant="subtitle2" className="font-semibold">
              10 likes
            </Typography>
            <div className={showCaption ? 'block' : 'flex items-center'}>
              <Link href="/" passHref>
                <Typography variant="subtitle2" component="span" className="mr-1 font-semibold">
                  hoanganh
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
                  <Button className="lowercase text-gray-400 p-0" onClick={() => setCaption(true)}>
                    more
                  </Button>
                </div>
              )}
            </div>
          </Box>
          <Link href="/" passHref>
            <Typography variant="body2" component="div" className="text-gray-400">
              View all {comments.length} comments
            </Typography>
          </Link>
          {comments.map((item) => (
            <div key={item.id}>
              {/* <Link href=""> */}
              <Typography variant="subtitle2" component="span" className="font-semibold">
                hoanganh
              </Typography>{' '}
              <Typography variant="body2" component="span">
                {item.comment}
              </Typography>
              {/* </Link> */}
            </div>
          ))}
          <Typography color="textSecondary" className="py-2" style={{ fontSize: '0.75rem' }}>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
        <Hidden xsDown>
          <Divider />
          <FeedComment />
        </Hidden>
        {showOptionsDialog && (
          <DialogCommon onClose={() => setOptionsDialog(false)}>
            <Button className="normal-case text-red-700 font-semibold">Unfollow</Button>
            <Divider />
            <Button className="normal-case">
              <Link href={`/post/${post._id}`} underline="none">
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
    ))
  );
}
