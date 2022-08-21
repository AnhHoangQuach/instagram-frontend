import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Seo from '../components/Seo';
import Header from '../components/Header';
import GridPost from '../components/Profile/GridPost';
import { postService } from '../services/post';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  postContainer: {
    [theme.breakpoints.down('sm')]: {
      gridGap: 2,
    },
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20,
  },
}));

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const getExplorePosts = async () => {
    try {
      setLoading(true);
      const postRes = await postService.getExplorePosts({ page, size: 7 });
      if (postRes.status === 'success') {
        setLoading(false);
        return postRes.data.posts;
      }
    } catch (error) {
      setLoading(false);
      dispatch(
        setMessage({ type: 'error', message: error.response?.data.message || error.message })
      );
    }
  };

  const fetchData = async () => {
    const postsFormServer = await getExplorePosts();

    setPosts([...posts, ...postsFormServer]);
    if (postsFormServer.length === 0) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postRes = await postService.getExplorePosts({ page: 1, size: 7 });
        if (postRes.status === 'success') {
          setPosts([...posts, ...postRes.data.posts]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        dispatch(setMessage({ type: 'error', message: error.response?.data.message || error.message }));
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Seo title="Explore" description="Explore Page" />
      <Header />
      <Box className="max-w-5xl xl:mx-auto mt-8">
        {posts.length > 0 ? (
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Box sx={{ display: 'grid' }}>
              <Box className={classes.postContainer}>
                {posts.map((post) => (
                  <GridPost key={post._id} post={post} />
                ))}
              </Box>
            </Box>
          </InfiniteScroll>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img src="/assets/images/gif-no-posts.gif" />
            <Typography variant="h6">Discover many interesting things about life</Typography>
          </div>
        )}
      </Box>
    </>
  );
}
