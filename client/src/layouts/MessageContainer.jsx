import SendInput from "../components/messages/SendInput";
import { useDispatch, useSelector } from "react-redux";
import Messages from "../components/messages/Messages";
import { useEffect, useRef, useState } from "react";
import { setSelectedUser } from "../useRedux/userSlice";
import ChatHeader from "../components/messages/ChatHeader";
import AttachMenu from "../components/dialogs/AttachMenu";

const MessageContainer = () => {
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);

  // const menuRef = useRef(null);

  console.log(attachMenuOpen);

  const dispatch = useDispatch();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 762);

  const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);

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


  // useEffect(() => {
  //     const handleClickOutside = (e) => {
  //         // console.log("hissse", menuRef.current.contains(e.target));
  //         // // if(!menuRef.current.contains(e.target)){
  //         // //    setAttachMenuOpen(false);
  //         // // }
  //     };

  //       window.addEventListener('click', handleClickOutside);
  //       return () => window.removeEventListener('click', handleClickOutside);

  //   }, [attachMenuOpen]);

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
          />
          {attachMenuOpen && <div className="absolute bottom-20 left-0">
            <AttachMenu />
          </div>}
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