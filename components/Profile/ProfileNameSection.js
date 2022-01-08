import { useState } from 'react';
import { Hidden, Box, Button, Typography, Divider, Avatar } from '@mui/material';
import router from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';
import { setMessage } from '../../store/messageSlice';
import { userService } from '../../services/user';
import DialogCommon from '../DialogCommon';

export default function ProfileNameSection({
  isOwner,
  profile,
  isFollowing,
  isFollower,
  onLoading,
}) {
  const dispatch = useDispatch();

  const [showUnfollowDialog, setUnfollowDialog] = useState(false);
  const [showSettingsDialog, setSettingsDialog] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleFollowUser = async () => {
    try {
      const res = await userService.followUser({ userId: profile._id });
      if (res.status === 'success') {
        dispatch(
          setMessage({ type: 'success', message: `Follow user ${profile.username} success` })
        );
      }
    } catch (error) {
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  const handleUnfollowUser = async () => {
    try {
      const res = await userService.unfollowUser({ userId: profile._id });
      if (res.status === 'success') {
        dispatch(
          setMessage({ type: 'success', message: `Unfollow user ${profile.username} success` })
        );
      }
    } catch (error) {
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
    setUnfollowDialog(false);
  };

  let followButton;

  if (isFollowing) {
    followButton = (
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => {
          handleFollowUser();
          onLoading(true);
        }}
      >
        Follow Back
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button size="small" onClick={() => setUnfollowDialog(true)} variant="outlined">
        Following
      </Button>
    );
  } else {
    followButton = (
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => {
          handleFollowUser();
          onLoading(true);
        }}
      >
        Follow
      </Button>
    );
  }
  return (
    <>
      <Hidden smDown>
        <Box
          sx={{
            display: 'grid',
            gridGap: 10,
            gridAutoFlow: 'column',
            gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, 120px) 30px',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Typography className="text-xl">{profile.username}</Typography>
          {isOwner ? (
            <>
              <Link href="/profile/edit" passHref>
                <Button
                  variant="outlined"
                  className="border-gray-400 px-0 text-black capitalize"
                  size="small"
                >
                  Edit Profile
                </Button>
              </Link>
            </>
          ) : (
            <>{followButton}</>
          )}
        </Box>
      </Hidden>
      <Hidden smUp>
        <section>
          <Box
            sx={{
              display: 'grid',
              gridGap: 10,
              gridAutoFlow: 'column',
              gridTemplateColumns: 'minmax(auto, max-content) 30px',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <Typography className="text-xl">{profile.username}</Typography>
          </Box>
          {isOwner ? (
            <Link href="/profile/edit" passHref>
              <Button
                variant="outlined"
                className="border-gray-400 px-0 text-black text-sm capitalize w-full"
              >
                Edit Profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      {showUnfollowDialog && (
        <DialogCommon onClose={() => setUnfollowDialog(false)}>
          <Box
            sx={{
              display: 'grid',
              justifyContent: 'center',
              padding: '32px 16px 16px',
            }}
          >
            <Avatar src={profile.avatar} alt="" sx={{ width: 90, height: 90 }} />
          </Box>
          <Typography align="center" variant="body2" className="mb-2">
            Unfollow @{profile.username}?
          </Typography>
          <Divider />
          <Button
            className="normal-case text-red-700"
            onClick={() => {
              handleUnfollowUser();
              onLoading(true);
            }}
          >
            Unfollow
          </Button>
        </DialogCommon>
      )}
    </>
  );
}
