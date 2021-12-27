import { useState } from 'react';
export default function Message({ chatsData }) {
  const [chats, setChats] = useState(chatsData);
  return <div>Hello</div>;
}
