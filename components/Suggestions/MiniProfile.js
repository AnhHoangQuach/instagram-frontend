import { Avatar, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function MiniProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <Link href={`/profile/${currentUser?._id}`} passHref>
        <Avatar src={currentUser?.avatar} alt="" className="cursor-pointer" />
      </Link>

      <Box className="flex-1 mx-4">
        <h2 className="font-semibold">{currentUser?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </Box>
    </div>
  );
}
