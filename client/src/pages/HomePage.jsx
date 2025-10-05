
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logout } from "./Logout";
import Sidebar from "../layouts/Sidebar";
import MessageContainer from "../layouts/MessageContainer";
import Modal from "../components/dialogs/EditMessageBox";
import { useRef, useState } from "react";
import EditMsgContext from "../context/EditMsgContext";



const HomePage = () => {
  const [messageEditOpen, setMessageEditOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  return (
    <div className="min-h-screen bg-blue-500 overflow-hidden md:pl-16 relative">
      <>
        <EditMsgContext.Provider value={
        { 
          setMessageEditOpen, 
          setMessage,
          message,
          input, 
          setInput, 
          inputRef
        }
          }
        >
          <Logout />
          <div>
            <Sidebar />
            <MessageContainer />
          </div>
          {messageEditOpen && <Modal />}
        </EditMsgContext.Provider>
      </>
    </div>
  );
};

export default HomePage;