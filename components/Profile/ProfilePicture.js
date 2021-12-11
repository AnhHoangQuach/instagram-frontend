import { Box, Avatar } from '@mui/material';

export default function ProfilePicture({ size, image = '/assets/images/45851733.png', isOwner }) {
  return (
    <section className="grid justify-items-center">
      <Box
        sx={{
          display: 'grid',
          position: 'relative',
          placeItems: 'center',
        }}
      >
        <Avatar src={image} alt="" sx={{ width: size, height: size }} />
      </Box>
    </section>
  );
}
