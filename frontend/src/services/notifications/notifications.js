import SocketIOClient from "socket.io-client";

let socketConnection;

const getSocketConnection = () => {
  if (socketConnection === undefined) {
    socketConnection = SocketIOClient("http://localhost:8082/notifications", {
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
