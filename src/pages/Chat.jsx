import React, { useEffect, useState } from "react";
import ChatRoom from "../components/chat/ChatRoom";
import { generateChatRoomId } from "../assistants/generators";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import RoomList from "../components/chat/RoomList";

export default function Chat() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const room = useParams().id;

  const socket = io("http://localhost:3001");

  return (
    <div className="w-full min-h-[90vh] bg-slate-100 flex items-center justify-center">
      <RoomList socket={socket} />
      <ChatRoom socket={socket} user={user} room={room} />
    </div>
  );
}
