import { Box, Avatar, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Banner({ bannerData }) {
  const { username, avatar } = bannerData;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
      {username ? (
        <>
          <Avatar src={avatar} />
          <Typography variant="body1" className="mx-2">
            {username}
          </Typography>
        </>
      ) : (
        <CircularProgress size="2rem" />
      )}
    </Box>
  );
}

export default Banner;
