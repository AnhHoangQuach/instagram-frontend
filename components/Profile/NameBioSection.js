import { Box, Typography, Link } from '@mui/material';

export default function NameBioSection({ profile }) {
  return (
    <Box className="mt-4">
      <Typography className="font-semibold text-sm">{profile?.fullname}</Typography>
      <Typography className="text-sm">{profile?.bio}</Typography>
      <Link href="/" target="_blank" underline="none">
        <Typography className="font-semibold text-sm">{profile?.website}</Typography>
      </Link>
    </Box>
  );
}
