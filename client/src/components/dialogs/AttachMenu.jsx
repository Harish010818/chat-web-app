import { ImagePlus, Mic } from "lucide-react";
import { useContext } from "react";
import EditMsgContext from "../../context/EditMsgContext";

const AttachMenu = () => {
  const { setSelectedFile } = useContext(EditMsgContext);

  const uploadImgHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
       setSelectedFile(file);

      }
  };

  const uploadAudioHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className=" bg-white border z-10 pb-16 pt-5 border-none shadow-gray-300 shadow rounded-lg">
      <input
        type="file"
        accept="audio/*"
        className="hidden"
        id="uploadAudioFile"
        onChange={uploadAudioHandler}
      />
      <label htmlFor="uploadAudioFile">
        <div className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4 cursor-pointer">
          <Mic size={23} />
          <span>Audio</span>
        </div>
      </label>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="uploadImgFile"
        onChange={uploadImgHandler}
      />
      <label htmlFor="uploadImgFile">
        <div className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4 cursor-pointer">
          <ImagePlus size={21} />
          <span>Image</span>
        </div>
      </label>
    </div>
  );
};

export default AttachMenu;