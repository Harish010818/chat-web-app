import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { MdCheckCircle } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import EditMsgContext from "../../context/EditMsgContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { editMessage } from "../../useRedux/messageSlice";
import { TimeFormat } from "../../utils/UtilifyFunc";


const Modal = ({ children }) => {
  const { message, setMessage, setMessageEditOpen, input, setInput, inputRef } = useContext(EditMsgContext);
  const dispatch = useDispatch();

  const onclose = () => {
    setMessageEditOpen(false);
    setInput("");
    setMessage(null);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  const editMsgHandler = async () => {

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/message/${message._id}`,
        { input },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

      if (res.data.success) {
        setMessageEditOpen(false);
        dispatch(editMessage({ id: message._id, newText: input }));
        toast.success("Message edited successfully");
      }

    } catch (error) {
      console.error(error);
    }
  }

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="bg-white h-75 w-130  px-6 rounded-2xl flex flex-col justify-center items-center gap-16  relative"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="text-black absolute top-2 left-6">
          <div className="flex gap-4">
            <IoMdClose
              size={23}
              className="text-gray-500 cursor-pointer"
              onClick={onclose}
            />
            <strong >Edit message</strong>
          </div>
        </div>
        <div className="bg-[var(--dark-blue)] pl-1.5 pb-5 pr-10 mt-10 rounded-lg shadow inline-block max-w-[60%] text-sm cursor-pointer relative">
          <div>{message?.message}</div>
          <time className="absolute bottom-1 right-2 text-[10px] text-gray-400">
            {TimeFormat(message?.createdAt)}
          </time>
        </div>

        <div className="grid gap-2.5 w-full">
          <div className="relative w-full">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-gray-500 w-full h-10 outline-none border-none"
              placeholder="Type a message..."
              type="text"
            />
            <MdCheckCircle
              size={35}
              onClick={input ? editMsgHandler : undefined}
              className={`${input ? 'text-blue-500' : 'text-gray-300'} absolute top-1 right-0 cursor-pointer`}
            />
          </div>
          <hr className="border-t-2 border-blue-500" />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // this div will be in index.html
  );
};

export default Modal;