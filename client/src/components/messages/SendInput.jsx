import { IoSend } from "react-icons/io5";
import { Plus, SmilePlus } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../useRedux/messageSlice";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

const SendInput = ({
  setAttachMenuOpen,
  menuBtnRef,
  setEmojisOpen,
  emojiBtnRef,
  message,
  setMessage,
}) => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((store) => store.user);

  const [count, setCount] = useState(0);
  const { messages } = useSelector((store) => store.message);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const minutes = Math.floor(count / 60).toString().padStart(2, "0");
  const seconds = (count % 60).toString().padStart(2, "0");

  //audio recording handler
  const audioRecordHandler = () => {
    console.log("recording...");
    setIsRecording((p) => !p);
  };

  const onRecordingDiscard = () => {
    setIsRecording(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/message/send-text/${
          selectedUser?._id
        }`,
        { message },

        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }

    setMessage("");
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setCount((p) => p + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      if (isRecording) setCount(0);
    };
  }, [isRecording]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="fixed bottom-0 right-0 md:w-[calc(100%-448px)] w-full px-4 md:px-12 py-3 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] z-10"
    >
      <div className="relative w-full max-w-screen-lg mx-auto">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isRecording ? true : false}
          type="text"
          placeholder={isRecording ? "Audio Recording..." : "Type a message..."}
          className="w-full text-gray-700 border border-gray-300 bg-white focus:outline-none focus:ring-1 text-sm rounded-lg pl-18 pr-10 py-3"
        />
        {!isRecording && (
          <div className="absolute left-3 top-3 inset-y-0 text-blue-500">
            <div className="flex gap-1">
              <Plus
                ref={menuBtnRef}
                size={24}
                className="cursor-pointer"
                onClick={() => setAttachMenuOpen((p) => !p)}
              />
              <SmilePlus
                ref={emojiBtnRef}
                size={23}
                className="cursor-pointer"
                onClick={() => setEmojisOpen((p) => !p)}
              />
            </div>
          </div>
        )}
        <button
          // Change type dynamically here
          type={message ? "submit" : "button"}
          className={`${
            message ? `text-blue-500` : `text-gray-600`
          } absolute inset-y-0 right-3 flex items-center cursor-pointer`}
        >
          {isRecording && (
            <div className="flex gap-6 absolute inset-y-0 right-20  items-center cursor-pointer">
              <div className="text-gray-500">{`${minutes}:${seconds}`}</div>
              <div className="">
                <Trash2
                  onClick={onRecordingDiscard}
                  size={20}
                  className="text-red-500"
                />
              </div>
              <div>
                <IoSend size={21} className="text-blue-500" />
              </div>
            </div>
          )}
          {message ? (
            <IoSend size={21} />
          ) : (
            <Mic
              size={23}
              className={` ${
                isRecording
                  ? "text-red-600 animate-pulse"
                  : "hover:text-blue-500"
              }`}
              onClick={audioRecordHandler}
            />
          )}
        </button>
      </div>
    </form>
  );
};

export default SendInput;