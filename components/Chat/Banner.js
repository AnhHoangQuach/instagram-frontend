import { Box, Avatar, Typography } from '@mui/material';

function Banner({ bannerData }) {
  const { username, avatar } = bannerData;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
      <Avatar src={avatar} />
      <Typography variant="body1" className="mx-2">
        {username}
      </Typography>
    </Box>
  );
}

export default Banner;
