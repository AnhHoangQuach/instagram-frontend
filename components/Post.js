import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Post({ id, username, userImg, img, caption }) {
  console.log(username);
  return (
    <div>
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <MoreHorizIcon className="h-5" />
      </div>
    </div>
  );
}
