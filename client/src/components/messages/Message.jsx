import { useEffect, useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { useSelector } from "react-redux";
import MessageMenu from "../dialogs/MessageMenu";
import TimeFormat from "../../utils/TimeFormat";

const Message = ({ message, activeMessageId, setActiveMessageId }) => {
  const scroll = useRef(null);
  const { authUser } = useSelector((store) => store.user);

  // console.log(activeMessageId, message._id);
  const isActive = activeMessageId === message._id;

  // to auto scroll to the latest message

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handleClick = (e) => {
    e.stopPropagation();
    setActiveMessageId(isActive ? null : message._id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (scroll.current && !scroll.current.contains(event.target)) {
        setActiveMessageId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const isImageUrl = (url) => {
    return (
      typeof url === "string" &&
      (url.startsWith("http://") || url.startsWith("https://")) &&
      /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
    );
  };

  return (
    <div
      ref={scroll}
      className={`w-full flex ${
        authUser?._id === message?.senderId
          ? "justify-end pr-2"
          : "justify-start pl-2"
      } my-1`}
    >
      <div
        className={`${
          authUser?._id === message?.senderId
            ? "bg-[var(--rich-black)] text-[var(--chat-bg)] self-end"
            : "bg-[var(--homepage-white)] text-black self-start"
        } 
                inline-block ${
                  !isImageUrl(message?.message)
                    ? "pl-2.5 pb-5 pr-10 max-w-[85%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[40%]"
                    : "max-w-[60%] pb-5"
                } rounded-lg shadow text-sm cursor-pointer group relative`}
      >
        {/* dropdown menu */}
        {isActive && (
          <div className="fixed left-3/5 top-2/6 z-10">
            <MessageMenu
              ref={scroll}
              authUserId={authUser?._id}
              message={message}
              activeMessageId={activeMessageId}
            />
          </div>
        )}

        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
          <SlArrowDown onClick={handleClick} />
        </div>
        <div>
          {isImageUrl(message?.message) ? (
            <img
              src={message.message}
              alt="chat-img"
              className="block w-full h-auto max-h-[450px] object-cover rounded-xl shadow-sm"
              loading="lazy"
            />
          ) : (
            <p>{message?.message}</p>
          )}
        </div>

        <time className="absolute bottom-1 right-2 text-[10px] text-gray-400">
          {TimeFormat(message.createdAt)}
        </time>
      </div>
    </div>
  );
};

export default Message;