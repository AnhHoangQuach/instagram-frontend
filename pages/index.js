import Head from 'next/head';
import Header from '../components/Header';
import Stories from '../components/Stories';
import Feed from '../components/Feed';
import Suggestions from '../components/Suggestions';
import { Grid } from '@mui/material';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram App" />
        <link rel="icon" href="/assets/images/instagram_icon.png" />
      </Head>

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
    </div>
  );
}
