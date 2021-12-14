import { useEffect, useState } from 'react';
import { ImageList, ImageListItem, Box } from '@mui/material';
import Seo from '../components/Seo';
import Header from '../components/Header';
import faker from 'faker';
import GridPost from '../components/Profile/GridPost';

export default function Explore() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const posts = [...Array(8)].map((_, i) => ({
      ...faker.helpers.createCard(),
      image: faker.image.food(),
      id: i,
    }));
    setPosts(posts);
  }, []);

  return (
    <>
      <Seo title="Explore" description="Explore Page" />
      <Header />
      <Box className="max-w-5xl xl:mx-auto mt-8">
        <ImageList
          sx={{
            width: '100%',
            height: '100%',
          }}
          variant="quilted"
          cols={3}
        >
          {posts.map((item) => (
            <ImageListItem key={item.id} cols={item.image.cols || 1} rows={item.image.rows || 1}>
              <GridPost post={item} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
