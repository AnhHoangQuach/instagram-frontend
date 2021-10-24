import { useEffect, useState } from 'react';
import faker from 'faker';
import MiniProfile from './MiniProfile';

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div>
      <MiniProfile />
      <div className="mt-4 ml-10">
        <div className="flex justify-between text-sm mb-5">
          <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
          <button className="text-gray-600 font-semibold">See All</button>
        </div>

        {suggestions.map((profile) => (
          <div key={profile.id} className="flex items-center justify-between mt-3">
            <img src={profile.avatar} className="w-10 h-10 rounded-full border p-[2px]" alt="" />
            <div className="flex-1 ml-4">
              <h2 className="text-sm font-semibold">{profile.username}</h2>
              <h3 className="text-xs text-gray-400">Follow you</h3>
            </div>
            <button className="text-blue-400 text-xs font-bold">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}
