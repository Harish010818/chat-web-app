import { useContext, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddReaction } from "react-icons/md";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import EditMsgContext from "../../context/EditMsgContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { unsendMessage } from "../../useRedux/messageSlice";

const MessageMenu = ({ ref, message, authUserId, activeMessageId }) => {
  const { setMessageEditOpen, setMessage, setInput } = useContext(EditMsgContext);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setMessageEditOpen(true);
    setMessage(message);
    setInput(message?.message);

  }

  const handleUnsend = async () => {

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/message/${activeMessageId}`,
        {
          withCredentials: true
        }
      )

      if (res.data.success) {
          dispatch(unsendMessage(activeMessageId)); 
          toast.success(res.data?.message);  
        }
        
      } catch (error) {
        toast.error(error.response?.data?.message);
        console.error(error);
      }
  };

  return (
    <div
      ref={ref}
      className=" bg-white border z-10 pb-16 pt-5 border-none shadow-gray-300 shadow rounded-lg"
    >


      <div
        onClick={handleEdit}
        className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4"
      >
        <MdOutlineAddReaction size={23} />
        <button>React</button>
      </div>
      {authUserId === message?.senderId && (
        <>
          <div
            onClick={handleEdit}
            className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4"
          >
            <CiEdit size={23} />
            <button>Edit</button>
          </div>

          <div
            onClick={handleUnsend}
            className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4"
          >
            <BsReverseBackspaceReverse size={21} />
            <button>Unsend</button>
          </div>
        </>
      )}
      <div
        className="pl-3 pr-20 py-3 text-red-500 hover:bg-gray-100 flex flex-row gap-4"
      >
        <RiDeleteBin6Line size={21} />
        <button>delete</button>
      </div>
    </div>
  );

}

export default MessageMenu;