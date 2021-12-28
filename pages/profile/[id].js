import { useState, useEffect, useCallback } from 'react';
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
import { postService } from '../../services/post';
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
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const getPostOfUser = async () => {
    try {
      setLoading(true);
      const postRes = await postService.getPosts({
        page: 1,
        limit: 5,
        orderBy: 'desc',
        user: id,
      });
      if (postRes.status === 'success') {
        setPosts(postRes.data.posts);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  const handleGetFollowingUser = async () => {
    try {
      setLoading(true);
      const res = await userService.getFollowing({ userId: id });
      if (res.status === 'success') {
        setFollowing(res.data.following);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  const handleGetFollowersUser = async () => {
    try {
      setLoading(true);
      const res = await userService.getFollowers({ userId: id });
      if (res.status === 'success') {
        setFollowers(res.data.followers);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  useEffect(async () => {
    if (profile._id === id) {
      setIsOwner(true);
    }
    try {
      setLoading(true);
      const res = await userService.getUser({ userId: id });
      if (res.status === 'success') {
        setProfile(res.data.user);
        setSavedPosts(res.data.savedPosts);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
    handleGetFollowingUser();
    handleGetFollowersUser();
    getPostOfUser();
  }, [id]);

  var isFollowing = !!following.find((ele) => ele.user._id === currentUser?._id);
  var isFollower = !!followers.find((ele) => ele.user._id === currentUser?._id);

  const callback = useCallback((loading) => {
    setLoading(loading);
    setTimeout(() => {
      handleGetFollowingUser();
      handleGetFollowersUser();
      isFollowing = following.find((ele) => ele.user._id === currentUser?._id);
      isFollower = followers.find((ele) => ele.user._id === currentUser?._id);
      setLoading(false);
    }, 1000);
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
              <ProfileNameSection
                isOwner={isOwner}
                profile={profile}
                isFollowing={isFollowing}
                isFollower={isFollower}
                onLoading={callback}
              />
              <PostCountSection
                postsCount={posts.length}
                followersCount={followers.length}
                followingCount={following.length}
              />
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
                <ProfileNameSection
                  isOwner={isOwner}
                  profile={profile}
                  isFollowing={isFollowing}
                  isFollower={isFollower}
                  onLoading={callback}
                />
              </Box>
              <NameBioSection />
            </CardContent>
            <PostCountSection
              postsCount={posts.length}
              followersCount={followers.length}
              followingCount={following.length}
            />
          </Card>
        </Hidden>
        <ProfileTabs isOwner={isOwner} profile={profile} savedPosts={savedPosts} posts={posts} />
      </Box>
    </>
  );
}
