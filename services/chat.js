import { clientRaw } from './axios';

const getChats = () => clientRaw.get(`/chat`);

const deleteChat = ({ messagesWith }) => clientRaw.delete(`/chat/${messagesWith}`);

export const chatService = {
  getChats,
  deleteChat,
};
