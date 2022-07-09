import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { userService } from '../../services/user';
import { setMessage } from '../../store/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Typography, Dialog, Zoom } from '@mui/material';
import ReactInstagramStories from 'react-insta-stories';
import moment from 'moment';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  stories: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
  },
}));

export default function Stories() {
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [showStories, setShowStories] = useState(false);
  const [nowStories, setNowStories] = useState([]);

  const handleGetStories = async () => {
    try {
      setLoading(true);
      const res = await userService.getStories({ userId: currentUser?._id });
      if (res.status === 'success') {
        setSuggestions(res.data.stories);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

  useEffect(() => {
    handleGetStories();
  }, []);

  const handleShowStories = (posts) => {
    setShowStories(true);
    setNowStories(posts);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      slidesToSlide: 3,
    },
  };

  return (
    !loading &&
    suggestions.length > 0 && (
      <div className="p-4 mt-8 border-gray-200 border rounded-sm">
        <Carousel responsive={responsive}>
          {suggestions.map((item, index) => (
            <div key={index}>
              <Avatar
                src={item.user.avatar}
                sx={{
                  width: 56,
                  height: 56,
                }}
                className="w-4/5 mx-auto border-red-500 border-2 cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
                alt="img"
                onClick={() => handleShowStories(item.posts)}
              />
              <Typography className="text-xs truncate text-center">{item.user.username}</Typography>
            </div>
          ))}

          {showStories && (
            <Dialog open onClose={() => setShowStories(false)} TransitionComponent={Zoom}>
              <ReactInstagramStories
                loop
                keyboardNavigation
                isPaused={true}
                stories={nowStories.map((value) => {
                  return {
                    url: value.images[0].url,
                    header: {
                      heading: <span>{value.user.username}</span>,
                      subheading: `Posted ${moment(value.createdAt).fromNow()}`,
                      profileImage: value.user.avatar,
                    },
                    type: value.images[0].format === 'mp4' && 'video',
                    duration: 4000,
                  };
                })}
                defaultInterval={1500}
              />
            </Dialog>
          )}
        </Carousel>
      </div>
    )
  );
}
