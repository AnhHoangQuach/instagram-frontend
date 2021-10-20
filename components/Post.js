import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

export default function Post({ id, username, userImg, img, caption }) {
  return (
    <div className="my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <MoreHorizIcon className="h-5" />
      </div>

      <img src={img} alt="" className="w-full object-cover" />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <FavoriteBorderIcon className="btn" />
          <ChatBubbleOutlineIcon className="btn" />
          <ShareIcon className="btn" />
        </div>
        <BookmarkBorderIcon className="btn" />
      </div>

      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      <form className="flex items-center p-4">
        <SentimentSatisfiedIcon className="h-7" />
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  );
}
