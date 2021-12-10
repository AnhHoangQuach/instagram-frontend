import { Hidden, Box, Button, Typography, Divider, Avatar } from '@mui/material';
import { useState } from 'react';
import router from 'next/router';
import Link from 'next/link';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import DialogCommon from '../DialogCommon';

export default function ProfileNameSection({ isOwner }) {
  const dispatch = useDispatch();

  const [showUnfollowDialog, setUnfollowDialog] = useState(false);
  const [showSettingsDialog, setSettingsDialog] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  let followButton;
  const isFollowing = false;
  const isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button size="small" onClick={() => setUnfollowDialog(true)} variant="outlined">
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button size="small" variant="contained" color="primary">
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button size="small" variant="contained" color="primary">
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
          <Typography className="text-xl">Hoanganh</Typography>
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
              <SettingsOutlinedIcon
                className="cursor-pointer"
                onClick={() => setSettingsDialog(true)}
              />
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
            <Typography className="text-xl">Hoanganh</Typography>
            {isOwner && (
              <SettingsOutlinedIcon
                className="cursor-pointer"
                onClick={() => setSettingsDialog(true)}
              />
            )}
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
            <Avatar src="/assets/images/45851733.png" alt="" sx={{ width: 90, height: 90 }} />
          </Box>
          <Typography align="center" variant="body2" className="mb-2">
            Unfollow @hoanganh?
          </Typography>
          <Divider />
          <Button className="normal-case text-red-700">Unfollow</Button>
        </DialogCommon>
      )}
      {showSettingsDialog && (
        <DialogCommon onClose={() => setSettingsDialog(false)}>
          <Divider />
          <Button className="normal-case" onClick={handleLogout}>
            Logout
          </Button>
        </DialogCommon>
      )}
    </>
  );
}
