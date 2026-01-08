import { useContext } from "react";
import EditMsgContext from "../../context/EditMsgContext";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../useRedux/messageSlice";
import toast from "react-hot-toast";
import axios from "axios";

const FilePreviewContainer = ({ message, setMessage }) => {
  const { selectedFile, setSelectedFile } = useContext(EditMsgContext);
  console.log(selectedFile);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!selectedFile && !message) return;

    const formData = new FormData();
    formData.append("file", selectedFile); // backend multer field
    if(message) formData.append("message", message);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/message/send-file/${selectedUser?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          withCredentials: true,
        }
      );

      if (res) {
        dispatch(setMessages([...messages, res?.data?.newMessage]));
        setSelectedFile(null);
      }
    } catch (err) {
      toast.error("Failed to upload image");
      console.error("Upload failed:", err);
    }
  };

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {selectedFile && (
        <div className="absolute flex flex-col  justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full h-screen min-h-screen bg-white shadow p-4 -z-10">
          <IoMdClose
            size={31}
            onClick={() => setSelectedFile(null)}
            className="text-gray-500 absolute top-25 left-25 cursor-pointer"
          />

          {selectedFile.type.startsWith("image/") && (
            <img
              alt="preview"
              src={URL.createObjectURL(selectedFile)}
              className="w-120 h-80 object-cover rounded"
            />
          )}

          {selectedFile.type.startsWith("audio/") && (
            <audio
              controls
              src={URL.createObjectURL(selectedFile)}
              className="max-w-xs w-full"
            />
          )}

          <form
            className="absolute bottom-8 max-w-2xl w-full"
            onSubmit={onSubmitHandler}
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={onChangeHandler}
              className="w-full text-gray-600 border border-gray-500 bg-white focus:outline-none focus:ring-1 text-sm rounded-lg px-3 py-4"
            />
            <button
              type="submit"
              className={`${
                message ? `text-blue-500` : `text-gray-600`
              } absolute inset-y-0 right-3 flex items-center cursor-pointer`}
            >
              <IoSend size={27} />
            </button>
          </form>

          {/* <div className="flex-1">
            <p className="text-sm font-medium">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div> */}
        </div>
      )}
    </>
  );
};

export default FilePreviewContainer;