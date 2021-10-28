import faker from 'faker';
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import GridPost from './GridPost';
import { makeStyles } from '@mui/styles';
import LinkedCameraOutlinedIcon from '@mui/icons-material/LinkedCameraOutlined';

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

export default function ProfilePosts({ user, isOwner }) {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const posts = [...Array(5)].map((_, i) => ({
      ...faker.helpers.createCard(),
      image: faker.image.food(),
      id: i,
    }));
    setPosts(posts);
  }, []);

  if (posts.length === 0) {
    return (
      <Box pt={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 2rem',
          }}
        >
          <LinkedCameraOutlinedIcon fontSize="large" />
          <Typography variant="h6" align="center" className="text-base sm:text-xl">
            {isOwner ? 'Upload a Posts' : 'Once you start making new posts, they will appear here'}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'minmax(auto, 935px)' }}>
      <Box className={classes.postContainer}>
        {posts.map((post) => (
          <GridPost key={post.id} post={post} />
        ))}
      </Box>
    </Box>
  );
}
