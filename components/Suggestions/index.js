import { useEffect, useState } from 'react';
import MiniProfile from './MiniProfile';
import Avatar from '@mui/material/Avatar';
import { userService } from '../../services/user';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../store/messageSlice';
import Link from 'next/link';

export default function Suggestions() {
  const { currentUser } = useSelector((state) => state.user);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  var isFollowing = false;

  const handleFollowUser = async (userId) => {
    try {
      const res = await userService.followUser({ userId });
      if (res.status === 'success') {
        dispatch(setMessage({ type: 'success', message: res.message }));
      }
    } catch (error) {
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  const handleUnfollowUser = async (userId) => {
    try {
      const res = await userService.unfollowUser({ userId });
      if (res.status === 'success') {
        dispatch(setMessage({ type: 'success', message: res.message }));
      }
    } catch (error) {
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  useEffect(async () => {
    try {
      setLoading(true);
      const res = await userService.suggestedUser({
        max: 5,
      });
      if (res.status === 'success') {
        setSuggestions(res.data.users);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  }, []);
  return (
    !isLoading && (
      <div>
        <MiniProfile />
        <div className="mt-4 ml-10">
          <div className="flex justify-between text-sm mb-5">
            <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
            <button className="text-gray-600 font-semibold">See All</button>
          </div>

          {suggestions.map((profile) => (
            <div key={profile._id} className="flex items-center justify-between mt-3">
              <Link href={`/profile/${profile._id}`} passHref>
                <Avatar src={profile.avatar} alt="" className="cursor-pointer" />
              </Link>
              <div className="flex-1 ml-4">
                <h2 className="text-sm font-semibold">{profile.username}</h2>
                <h3 className="text-xs text-gray-400">Follow you</h3>
              </div>
              {isFollowing ? (
                <button
                  className="text-blue-400 text-xs font-bold"
                  onClick={() => {
                    handleUnfollowUser(profile._id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="text-blue-400 text-xs font-bold"
                  onClick={() => {
                    handleFollowUser(profile._id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
}
