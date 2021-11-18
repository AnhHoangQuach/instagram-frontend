import { Avatar, Box } from '@mui/material';

export default function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <Avatar src="https://picsum.photos/200/300" alt="" />

      <Box className="flex-1 mx-4">
        <h2 className="font-semibold">Hoang Anh</h2>
        <h3 className="text-sm text-gray-400">Welcomte to Instagram</h3>
      </Box>

      <button className="text-blue-400 text-sm font-semibold">Switch</button>
    </div>
  );
}
