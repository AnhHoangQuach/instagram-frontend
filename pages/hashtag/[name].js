import { useState, useEffect } from 'react';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import GlobalLoading from '../../components/GlobalLoading';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Avatar, Typography } from '@mui/material';
import GridPost from '../../components/Profile/GridPost';
import { postService } from '../../services/post';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/messageSlice';

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

export default function Hashtag() {
  const classes = useStyles();
  const router = useRouter();
  const { name } = router.query;
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const dispatch = useDispatch();

  const getHashtagPosts = async () => {
    try {
      setLoading(true);
      const postRes = await postService.retrieveHashtagPosts({ hashtag: name });
      if (postRes.status === 'success') {
        setPosts(postRes.data.posts);
        setPostsCount(postRes.data.postCount);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  useEffect(() => {
    getHashtagPosts();
  }, [name]);

  return (
    <>
      <Seo title={`Hashtag ${name}`} description={`Hashtag ${name}`} />
      <Header />
      {loading ? (
        <GlobalLoading />
      ) : (
        <Grid container className="max-w-5xl mx-auto mt-8">
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateColumns: 'minmax(auto, 160px) minmax(auto, 645px)',
              marginBottom: 4,
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ width: 120, height: 120 }} />
            <div>
              <Typography variant="h5"># {name}</Typography>
              <Typography variant="body1">{postsCount} posts</Typography>
            </div>
          </Box>
          <Box className={classes.postContainer}>
            {posts.map((post) => (
              <GridPost key={post._id} post={post} />
            ))}
          </Box>
        </Grid>
      )}
    </>
  );
}
