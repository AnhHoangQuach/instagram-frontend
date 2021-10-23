import Link from 'next/link';
import { useState, useEffect } from 'react';
import FeedComment from './FeedComment';
import FeedImage from './FeedImage';
import { Avatar, Typography, Box, Button, Hidden, Divider } from '@mui/material';
import faker from 'faker';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function Feed() {
  const [images, setImages] = useState([]);
  const [showCaption, setCaption] = useState(false);
  const [comments, setComments] = useState([]);
  const [caption, setCaptionText] = useState('');

  useEffect(() => {
    const images = [...Array(5)].map((_, i) => ({
      image: faker.image.animals(),
      id: i,
    }));

    const comments = [...Array(1)].map((_, i) => ({
      comment: faker.lorem.sentences(),
      id: i,
    }));

    const captionFake = faker.lorem.sentence();
    setImages(images);
    setComments(comments);
    setCaptionText(captionFake);
  }, []);
  const handleMore = () => {
    console.log('hello');
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="rounded-sm my-7 border">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center">
          <Link href="/">
            <Avatar src="/assets/images/45851733.png" />
          </Link>
          <Typography variant="subtitle2" className="font-light mx-4">
            hoanganh
          </Typography>
        </div>
        <MoreHorizIcon onClick={handleMore} />
      </div>
      <Carousel responsive={responsive} showDots={true} keyBoardControl={true}>
        {images.map((item) => (
          <FeedImage key={item.id} img={item.image} />
        ))}
      </Carousel>
      <Box m={1}>
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <FavoriteBorderOutlinedIcon />
            <ChatBubbleOutlineOutlinedIcon />
            <ShareOutlinedIcon />
          </div>
          <BookmarkBorderIcon />
        </div>
        <Box mt={1}>
          <Typography variant="subtitle2" className="font-bold">
            10 likes
          </Typography>
          <div className={showCaption ? 'block' : 'flex items-center'}>
            <Link href="/">
              <Typography variant="subtitle2" component="span" className="mr-1 font-bold">
                hoanganh
              </Typography>
            </Link>
            {showCaption ? (
              <Typography
                variant="body2"
                component="span"
                dangerouslySetInnerHTML={{ __html: caption }}
              />
            ) : (
              <div className="flex items-center break-all text-sm">
                <HTMLEllipsis unsafeHTML={caption} maxLine="0" ellipsis="..." basedOn="words" />
                <Button className="lowercase text-gray-400 p-0" onClick={() => setCaption(true)}>
                  more
                </Button>
              </div>
            )}
          </div>
        </Box>
        <Link href="/">
          <Typography variant="body2" component="div" className="text-gray-400">
            View all {comments.length} comments
          </Typography>
        </Link>
        {comments.map((item) => (
          <div key={item.id}>
            {/* <Link href=""> */}
            <Typography variant="subtitle2" component="span" className="font-bold">
              hoanganh
            </Typography>{' '}
            <Typography variant="body2" component="span">
              {item.comment}
            </Typography>
            {/* </Link> */}
          </div>
        ))}
        <Typography color="textSecondary" className="py-2" style={{ fontSize: '10px' }}>
          5 DAYS AGO
        </Typography>
      </Box>
      <Hidden xsDown>
        <Divider />
        <FeedComment />
      </Hidden>
    </div>
  );
}
