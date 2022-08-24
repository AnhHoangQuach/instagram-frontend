import Seo from '../components/Seo';
import Header from '../components/Header';
import Stories from '../components/Stories';
import Feed from '../components/Feed';
import Suggestions from '../components/Suggestions';
import { baseUrl } from '../utils/helpers';
import { Grid, Box } from '@mui/material';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

export default function Home() {
  const socket = useRef();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit('join', { userId: currentUser?._id });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current.off();
      }
    };
  }, [currentUser?._id]);
  return (
    <Box>
      <Seo title="Home" description="Home Page" />
      <Header />
      <Grid container className="max-w-5xl mx-auto">
        <Grid item xs={12} sm={8} className="w-full">
          <Stories />
          <Feed />
        </Grid>
        <Grid item xs={12} sm={4} className="hidden md:block">
          <Suggestions />
        </Grid>
      </Grid>
    </Box>
  );
}
