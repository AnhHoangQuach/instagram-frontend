import { Box, Typography, Link } from '@mui/material';

export default function NameBioSection() {
  return (
    <Box className="mt-4">
      <Typography className="font-bold text-sm">Quach Hoang Anh</Typography>
      <Typography className="text-sm">This is my bio</Typography>
      <Link href="/" target="_blank" underline="none">
        <Typography className="font-bold text-sm">
          https://www.facebook.com/profile.php?id=100007422227963
        </Typography>
      </Link>
    </Box>
  );
}
