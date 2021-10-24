import PersonIcon from '@mui/icons-material/Person';
import { Box, Avatar } from '@mui/material';

export default function ProfilePicture({ size, image = '/assets/images/45851733.png', isOwner }) {
  return (
    <section className="grid justify-items-center">
      <Box
        sx={{
          display: 'grid',
          position: 'relative',
          placeItems: 'center',
          padding: '32px 16px 16px',
        }}
      >
        <Avatar
          src={image || 'https://ui-avatars.com/api/?rounded=true'}
          alt=""
          sx={{ width: size, height: size }}
        />
      </Box>
    </section>
  );
}
