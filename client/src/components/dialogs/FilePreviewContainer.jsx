import { useContext } from "react";
import EditMsgContext from "../../context/EditMsgContext";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";


const FilePreviewContainer = ({ message, setMessage }) => {
  const { selectedFile, setSelectedFile } = useContext(EditMsgContext);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {selectedFile && (
        <div className="absolute flex flex-col  justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full h-screen min-h-screen bg-white shadow p-4 -z-10">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="preview"
            className="w-120 h-80 object-cover rounded"
          />

          <form className="absolute bottom-8 max-w-2xl w-full">
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

          <IoMdClose
            size={31}
            onClick={() => setSelectedFile(null)}
            className="text-gray-500 absolute top-25 left-25 cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

export default FilePreviewContainer;