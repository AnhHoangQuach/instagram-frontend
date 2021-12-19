import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Seo from '../../components/Seo';
import ProfilePicture from '../../components/Profile/ProfilePicture';
import PostCountSection from '../../components/Profile/PostCountSection';
import ProfileNameSection from '../../components/Profile/ProfileNameSection';
import NameBioSection from '../../components/Profile/NameBioSection';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import GlobalLoading from '../../components/GlobalLoading';
import { Box, Hidden, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { userService } from '../../services/user';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/messageSlice';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [isLoading, setLoading] = useState(false);

  const [profile, setProfile] = useState(currentUser);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(async () => {
    if (profile._id === id) {
      setIsOwner(true);
    }
    try {
      setLoading(true);
      const res = await userService.getUser({ userId: id });
      if (res.status === 'success') {
        setProfile(res.data.user);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  }, []);

  return isLoading ? (
    <GlobalLoading />
  ) : (
    <>
      <Seo title={`${profile.fullname} (@${profile.username})`} />
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
            <ProfilePicture isOwner={isOwner} size={150} image={profile.avatar} />
            <CardContent sx={{ display: 'grid', gridGrap: 20 }}>
              <ProfileNameSection isOwner={isOwner} profile={profile} />
              <PostCountSection />
              <NameBioSection profile={profile} />
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
                <ProfilePicture isOwner={isOwner} size={77} profile={profile} />
                <ProfileNameSection isOwner={isOwner} profile={profile} />
              </Box>
              <NameBioSection />
            </CardContent>
            <PostCountSection />
          </Card>
        </Hidden>
        <ProfileTabs isOwner={isOwner} profile={profile} />
      </Box>
    </>
  );
}
