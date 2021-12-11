import { Avatar, Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function MiniProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <Avatar src={currentUser?.avatar} alt="" />

      <Box className="flex-1 mx-4">
        <h2 className="font-semibold">{currentUser?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcomte to Instagram</h3>
      </Box>

      <button className="text-blue-400 text-sm font-semibold">Switch</button>
    </div>
  );
}
