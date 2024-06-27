import { Avatar } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RoomItem({ room }) {
  const roomId = useParams().id;
  const currentlySelected = roomId && room === roomId;

  return (
    <div
      onClick={() => (window.location.href = `/chat/${room}`)}
      className={`w-full flex items-center justify-between gap-2 p-2 cursor-default border-b border-gray-200 ${
        currentlySelected ? "bg-slate-200" : "bg-white hover:bg-slate-100"
      }`}
    >
      <div className="flex gap-2">
        <Avatar src="" alt="" size={40} />
        <div className="flex flex-col self-start justify-start gap-1">
          <p>SELLER</p>
          <p className="text-xs text-gray-500">
            Garmin 3s Soft Gold Smart Watch
          </p>
        </div>
      </div>
      <img
        src="https://www.watchshop.com/images/products/86756101_l.jpg"
        alt=""
        className="w-16 rounded-full"
      />
    </div>
  );
}
