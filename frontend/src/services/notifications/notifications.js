import SocketIOClient from "socket.io-client";

import { API_GATEWAY_ENDPOINT } from "../config.js";

let socketConnection;

const getSocketConnection = () => {
  if (socketConnection === undefined) {
    socketConnection = SocketIOClient(`${API_GATEWAY_ENDPOINT}/notifications`, {
      reconnectionDelayMax: 10000,
      reconnectionAttempts: 20,
      transports: ["websocket"]
    });
  }
  return socketConnection;
};

export const sendMessage = (topic, message) => {
  try {
    const socketConnection = getSocketConnection();
    socketConnection.emit(topic, JSON.stringify(message));
  } catch (err) {
    console.error(err);
  }
};
