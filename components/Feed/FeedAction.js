import { useState } from 'react';
import { LikeIcon, UnlikeIcon, RemoveIcon, SaveIcon } from '../../utils/icons';
import { makeStyles } from '@mui/styles';
import { userService } from '../../services/user';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/messageSlice';
export const useStyles = makeStyles((theme) => ({
  saveIcon: {
    justifySelf: 'right',
  },
  like: {
    animation: '$like-button-animation 0.45s',
    animationTimingFunction: 'ease-in-out',
    transform: 'scale(1)',
  },
  liked: {
    animation: '$liked-button-animation 0.45s',
    animationTimingFunction: 'ease-in-out',
    transform: 'scale(1)',
  },
  '@keyframes like-button-animation': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.2)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes liked-button-animation': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.2)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  },
}));

export function LikeButton() {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;

  function handleLike() {
    console.log('like');
    setLiked(true);
  }

  function handleUnlike() {
    console.log('unlike');
    setLiked(false);
  }

  return <Icon className={className} onClick={onClick} />;
}

export function SaveButton({ postId, isBookmarked }) {
  const classes = useStyles();
  const [saved, setSaved] = useState(isBookmarked);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const dispatch = useDispatch();
  async function handleSave() {
    try {
      const res = await userService.bookmarkPost({ postId });
      if (res.status === 'success') {
        setSaved(!saved);
      }
    } catch (error) {
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  }

  return <Icon className={classes.saveIcon} onClick={handleSave} />;
}
