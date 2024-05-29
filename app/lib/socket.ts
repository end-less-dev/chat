'use client';

import { io } from "socket.io-client"

export const socket = io('https://chat-backend-o3ec.onrender.com', {
  transports: ['websocket'],
});