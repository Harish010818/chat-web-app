import SendInput from "../components/messages/SendInput";
import { useDispatch, useSelector } from "react-redux";
import Messages from "../components/messages/Messages";
import { useEffect, useRef, useState } from "react";
import { setSelectedUser } from "../useRedux/userSlice";
import ChatHeader from "../components/messages/ChatHeader";
import AttachMenu from "../components/dialogs/AttachMenu";
import Emojis from "../components/dialogs/Emojis";

const MessageContainer = () => {
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const [emojisOpen, setEmojisOpen] = useState(false);

  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const emojiRef = useRef(null);
  const emojiBtnRef = useRef(null);

  const dispatch = useDispatch();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 762);

  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  const backToHomePage = () => {
    dispatch(setSelectedUser(null));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 762);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        //To isolate the click event from the menu button and AttachmentsMenubar
        menuRef.current &&
        menuBtnRef.current &&
        !menuRef.current.contains(e.target) &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setAttachMenuOpen(false);
      }
      if (
        //To isolate the click event from the menu button and AttachmentsMenubar
        emojiRef.current &&
        emojiBtnRef.current &&
        !emojiRef.current.contains(e.target) &&
        !emojiBtnRef.current.contains(e.target)
      ) {
        setEmojisOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [attachMenuOpen, emojisOpen]);

  return (
    <div
      className={
        (isLargeScreen && selectedUser == null) || selectedUser !== null
          ? `md:ml-96 min-h-screen grid bg-[var(--chat-bg)] md:w-[calc(100%-448px)] w-full fixed h-screen`
          : ``
      }
    >
      {selectedUser !== null ? (
        <>
          <ChatHeader
            selectedUser={selectedUser}
            isOnline={isOnline}
            isLargeScreen={isLargeScreen}
            backToHomePage={backToHomePage}
          />
          <Messages />
          <SendInput
            setAttachMenuOpen={setAttachMenuOpen}
            setEmojisOpen={setEmojisOpen}
            menuBtnRef={menuBtnRef}
            emojiBtnRef={emojiBtnRef}
          />
          {attachMenuOpen && (
            <div ref={menuRef} className="absolute bottom-20 left-0">
              <AttachMenu />
            </div>
          )}
          {emojisOpen && (
            <div ref={emojiRef} className="absolute bottom-20 left-40">
              <Emojis />
            </div>
          )}
        </>
      ) : (
        // for the large screen we need to show greetings!!!
        isLargeScreen && (
          <div className="flex items-center justify-center text-[var(--dark-blue)]">
            <div>
              <h1 className="text-4xl font-bold tracking-wider">
                Hi,
                {authUser?.fullName}!
              </h1>
              <h1 className="text-2xl">Let's start conversation...</h1>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MessageContainer;
