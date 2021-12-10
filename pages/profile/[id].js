import { useState } from 'react';
import Header from '../../components/Header';
import Seo from '../../components/Seo';
import ProfilePicture from '../../components/Profile/ProfilePicture';
import PostCountSection from '../../components/Profile/PostCountSection';
import ProfileNameSection from '../../components/Profile/ProfileNameSection';
import NameBioSection from '../../components/Profile/NameBioSection';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import { Box, Hidden, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Profile() {
  const isOwner = false;
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();
  const { id } = router.query;
  if (currentUser?._id === id) {
    isOwner = true;
  }

  return (
    <>
      <Seo title={`${currentUser.fullname} (@${currentUser.username})`} />
      <Header />
      <Box className="max-w-5xl xl:mx-auto mt-8">
        <Hidden smDown>
          <Card
            className="bg-transparent"
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateColumns: 'minmax(auto, 290px) minmax(auto, 645px)',
            }}
          >
            <ProfilePicture isOwner={isOwner} size={150} />
            <CardContent sx={{ display: 'grid', gridGrap: 20 }}>
              <ProfileNameSection isOwner={isOwner} />
              <PostCountSection />
              <NameBioSection />
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className="bg-transparent w-screen">
            <CardContent>
              <Box
                sx={{
                  display: 'grid',
                  gridAutoFlow: 'column',
                  gridTemplateColumns: '77px auto',
                  gridGap: 40,
                }}
              >
                <ProfilePicture isOwner={isOwner} size={77} />
                <ProfileNameSection isOwner={isOwner} />
              </Box>
              <NameBioSection />
            </CardContent>
            <PostCountSection />
          </Card>
        </Hidden>
        <ProfileTabs isOwner={isOwner} />
      </Box>
    </>
  );
}
