import { Avatar, Typography } from '@mui/material';
export default function Story({ img, username }) {
  return (
    <>
      <Avatar
        src={img}
        sx={{
          width: 56,
          height: 56,
        }}
        className="w-4/5 mx-auto border-red-500 border-2 cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        alt="img"
      />
      <Typography className="text-xs truncate text-center">{username}</Typography>
    </>
  );
}
