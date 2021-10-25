import { Box, Typography, Link } from '@mui/material';

export default function NameBioSection() {
  return (
    <Box className="mt-4">
      <Typography className="font-bold">Quach Hoang Anh</Typography>
      <Typography>hoanganh36</Typography>
      <Link href="/" target="_blank">
        <Typography color="secondary" className="font-bold">
          https://www.facebook.com/profile.php?id=100007422227963
        </Typography>
      </Link>
    </Box>
  );
}
