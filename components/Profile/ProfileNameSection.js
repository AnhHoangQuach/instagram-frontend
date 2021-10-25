import { Hidden, Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import UnfollowDialog from '../Profile/UnfollowDialog';

export default function ProfileNameSection({ isOwner, handleOptionsMenuClick }) {
  const [showUnfollowDialog, setUnfollowDialog] = useState(false);

  let followButton;
  const isFollowing = true;
  const isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button onClick={() => setUnfollowDialog(true)} variant="outlined">
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button variant="contained" color="primary">
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button variant="contained" color="primary">
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
              <Link href="/">
                <Button variant="outlined" size="small">
                  Edit Profile
                </Button>
              </Link>
              <SettingsOutlinedIcon className="cursor-pointer" onClick={handleOptionsMenuClick} />
            </>
          ) : (
            { followButton }
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
              <SettingsOutlinedIcon className="cursor-pointer" onClick={handleOptionsMenuClick} />
            )}
          </Box>
          {isOwner ? (
            <Link href="/">
              <Button variant="outlined" style={{ width: '100%' }}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      {showUnfollowDialog && <UnfollowDialog onClose={() => setUnfollowDialog(false)} />}
    </>
  );
}
