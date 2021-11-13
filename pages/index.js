import Seo from '../components/Seo';
import Header from '../components/Header';
import Stories from '../components/Stories';
import Feed from '../components/Feed';
import Suggestions from '../components/Suggestions';
import { Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from '../store/userSlice';
import GlobalLoading from '../components/globalLoading';

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getMe());
    setLoading(false);
  }, []);
  return loading ? (
    <GlobalLoading />
  ) : (
    <Box>
      <Seo title="Home" description="Home Page" />
      <Header />
      <Grid container className="max-w-5xl mx-auto">
        <Grid item xs={12} sm={8}>
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
