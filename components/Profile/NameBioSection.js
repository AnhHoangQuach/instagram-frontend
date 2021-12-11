import { Box, Typography, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function NameBioSection() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Box className="mt-4">
      <Typography className="font-semibold text-sm">{currentUser?.fullname}</Typography>
      <Typography className="text-sm">{currentUser?.bio}</Typography>
      <Link href="/" target="_blank" underline="none">
        <Typography className="font-semibold text-sm">{currentUser?.website}</Typography>
      </Link>
    </Box>
  );
}
