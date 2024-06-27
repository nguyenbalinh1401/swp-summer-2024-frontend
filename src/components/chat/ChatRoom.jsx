import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import anime from "animejs/lib/anime.es.js";
import { generateNumericCode } from "../../assistants/generators";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-config";

export default function ChatRoom({ user, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const messageRef = collection(db, "messages");

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        id: generateNumericCode(20),
        room: room,
        author: user.username,
        authorId: user.id,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          (new Date(Date.now()).getMinutes() < 10 ? "0" : "") +
          new Date(Date.now()).getMinutes(),
        createdAt: serverTimestamp(),
      };
      await addDoc(messageRef, messageData);
      setMessageList((current) => [...current, messageData]);
    }
    setCurrentMessage("");
  };

  const handleScroll = (isBottom) => {
    if (!isBottom) {
      setIsAtBottom(false);
    } else {
      setIsAtBottom(true);
    }
  };

  const handleEnterPressed = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    anime({
      targets: ".toBottomButton",
      translateY: 50,
      autoplay: true,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    const realTimeHandler = onSnapshot(queryMessages, (snapshot) => {
      let tempMessages = [];
      snapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessageList(tempMessages);
    });

    return () => realTimeHandler();
  }, []);

  return (
    <div className="relative w-1/2 h-[85vh] rounded-r-xl bg-white border-l border-gray-400 flex flex-col items-start justify-end py-2">
      <div className="z-10 bg-white border-b border-gray-300 w-full flex items-center justify-between px-4 py-2">
        <div className="flex items-center justify-start gap-4">
          <Avatar
            src="https://i.pinimg.com/564x/9d/ab/94/9dab94d5759643ae0d91565992eefec6.jpg"
            alt=""
            size={48}
          />
          <p>SELLER</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-[30px] bg-slate-100 hover:bg-slate-200 cursor-pointer">
          <img
            src="https://i.pinimg.com/564x/77/4c/03/774c03847c9a614aff17f49beaf9be57.jpg"
            alt=""
            className="w-10 rounded-full"
          />
          <div className="flex flex-col items-start gap-1 text-sm">
            <p>Garmin 3s Soft Gold Smart Watch</p>
            <p className="text-red-500">$ 249</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mr-4">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM21.4462 20.032L22.9497 21.5355L21.5355 22.9497L20.032 21.4462C19.4365 21.7981 18.7418 22 18 22C15.7909 22 14 20.2091 14 18C14 15.7909 15.7909 14 18 14C20.2091 14 22 15.7909 22 18C22 18.7418 21.7981 19.4365 21.4462 20.032ZM18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z"></path>
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M16.9057 5.68009L5.68009 16.9057C4.62644 15.5506 4 13.8491 4 12C4 7.58172 7.58172 4 12 4C13.8491 4 15.5506 4.62644 16.9057 5.68009ZM7.0943 18.3199L18.3199 7.0943C19.3736 8.44939 20 10.1509 20 12C20 16.4183 16.4183 20 12 20C10.1509 20 8.44939 19.3736 7.0943 18.3199ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5223 6.47771 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47771 17.5223 2 12 2Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <ScrollableFeed forceScroll onScroll={handleScroll} className="w-full">
        <div className="grow w-full min-h-[65vh] flex flex-col items-start justify-end gap-2 py-2 overflow-y-auto">
          {messageList?.map((mes, index) => {
            return (
              <div
                key={index}
                className={`px-2 w-full flex items-center ${
                  mes.authorId === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex ${
                    mes.authorId === user.id ? "flex-row-reverse" : "flex-row"
                  } items-center gap-2`}
                >
                  <Avatar
                    src={user.avatar}
                    alt=""
                    size={16}
                    className={`${
                      mes.authorId === user.id ? "hidden" : "inline"
                    }`}
                  />
                  <p
                    className={`px-4 py-2 rounded-[30px] max-w-96 break-words ${
                      mes.authorId === user.id
                        ? "bg-sky-800 text-white"
                        : "bg-slate-200 text-black"
                    }`}
                  >
                    {mes.message}
                  </p>
                  <p className="text-xs">{mes.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollableFeed>

      <button
        onClick={() => {}}
        className={`${
          isAtBottom ? "invisible" : "visible"
        } toBottomButton absolute bottom-[20%] left-1/2 z-10 flex items-center justify-center w-fit bg-white rounded-full shadow-xl p-2 transition-all duration-200`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
        </svg>
      </button>

      <div className="w-full flex items-center justify-center gap-1 px-4">
        <input
          id="message-input"
          type="text"
          autoComplete="off"
          value={currentMessage}
          placeholder="Enter message..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => handleEnterPressed(e)}
          className="w-full border border-gray-400 rounded-xl px-4 py-2"
        />
        <button
          disabled={currentMessage.trim().length === 0}
          id="send-message-btn"
          onClick={sendMessage}
          className={`flex items-center justify-center ${
            currentMessage.trim().length === 0
              ? "text-gray-400"
              : "bg-sky-600 text-white hover:bg-sky-800"
          } rounded-xl px-4 py-3 duration-100 disabled:cursor-not-allowed`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
