import { Box, CircularProgress } from '@mui/material';
import Seo from '../components/Seo';
import Header from '../components/Header';
import GridPost from '../components/Profile/GridPost';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@mui/styles';
import { usePost } from '../hooks/usePost';

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
  const { posts, error, fetchNextPage, hasNextPage, status } = usePost();
  const classes = useStyles();

  return (
    <>
      <Seo title="Explore" description="Explore Page" />
      <Header />
      <Box className="max-w-5xl xl:mx-auto mt-8">
        <InfiniteScroll
          dataLength={posts ? posts.totalDocs : 0}
          next={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          loader={
            <div className="flex justify-center items-center my-4">
              <CircularProgress size="1.5rem" />
            </div>
          }
        >
          <Box sx={{ display: 'grid' }}>
            <Box className={classes.postContainer}>
              {posts &&
                posts.docs.map((character) => <GridPost key={character._id} post={character} />)}
            </Box>
          </Box>
        </InfiniteScroll>
      </Box>
    </>
  );
}
