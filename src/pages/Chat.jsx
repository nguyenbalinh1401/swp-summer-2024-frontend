import React, { useEffect, useState } from "react";
import ChatRoom from "../components/chat/ChatRoom";
import { generateChatRoomId } from "../assistants/generators";
import { useParams } from "react-router-dom";
import RoomList from "../components/chat/RoomList";

export default function Chat() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const room = useParams().id;

  return (
    <div className="w-full min-h-[90vh] bg-slate-100 flex items-center justify-center">
      <RoomList />

      {room ? (
        <ChatRoom user={user} room={room} />
      ) : (
        <div className="">SELECT ROOM</div>
      )}
    </div>
  );
}
