import faker from 'faker';
import Story from './Story';
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

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
    <div className="p-6 mt-8 border-gray-200 border rounded-sm">
      <Carousel responsive={responsive}>
        {suggestions.map((profile) => (
          <Story key={profile.id} img={profile.avatar} username={profile.username} />
        ))}
      </Carousel>
    </div>
  );
}
