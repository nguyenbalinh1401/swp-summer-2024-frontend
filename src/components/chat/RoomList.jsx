import React, { useState } from "react";
import RoomItem from "./RoomItem";

export default function RoomList({ socket }) {
  return (
    <div className="w-1/4 min-h-[85vh] rounded-l-xl bg-white flex flex-col">
      <p className="px-8 py-4 text-[1.5em] font-bold">CHAT</p>
      <RoomItem room="1111" socket={socket} />
      <RoomItem room="2222" socket={socket} />
    </div>
  );
}
