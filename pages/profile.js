import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Link from 'next/link';
import ProfilePicture from '../components/Profile/ProfilePicture';
import PostCountSection from '../components/Profile/PostCountSection';
import ProfileNameSection from '../components/Profile/ProfileNameSection';
import { Box, Hidden, Typography, Button } from '@mui/material';

export default function Profile() {
  const [showOptionsMenu, setOptionsMenu] = useState(false);
  const isOwner = true;

  const handleOptionsMenuClick = () => {
    setOptionsMenu(true);
  };

  const handleCloseMenu = () => {
    setOptionsMenu(false);
  };
  return (
    <div>
      <Head>
        <title>hoanganh (@hoanganh-Instagram)</title>
        <meta name="description" content="Instagram App" />
        <link rel="icon" href="/assets/images/instagram_icon.png" />
      </Head>
      <Header />
      <Box className="max-w-5xl mx-5 xl:mx-auto">
        <Hidden xsDown>
          <Box
            className="bg-transparent"
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateColumns: 'minmax(auto, 290px) minmax(auto, 645px)',
            }}
          >
            <ProfilePicture isOwner={isOwner} size={150} />
            <Box sx={{ display: 'grid', gridGrap: 20 }}>
              <ProfileNameSection
                isOwner={isOwner}
                handleOptionsMenuClick={handleOptionsMenuClick}
              />
              <PostCountSection />
            </Box>
          </Box>
        </Hidden>
      </Box>
    </div>
  );
}
