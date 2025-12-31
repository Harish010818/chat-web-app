
import { ImagePlus, Mic } from 'lucide-react';


const AttachMenu = () => {



const uploadImgHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0]; //user-selected file
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePhoto", file);

    // try {
    //   const res = await axios.post(
    //     `${import.meta.env.VITE_API_URL}/api/v1/user/upload-profile/${
    //       authUser._id
    //     }`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    // } catch (err) {
    //   toast.error("Failed to upload image");
    //   console.error("Upload failed:", err);
    // }
  };   
      
  return (
            <div
                className=" bg-white border z-10 pb-16 pt-5 border-none shadow-gray-300 shadow rounded-lg"
                >
                  <div
                    className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4 cursor-pointer"
                  >
                  <Mic size={23} />
                    <button>Audio</button>
                  </div>
                  <div
                    className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4 cursor-pointer"
                    onClick={uploadImgHandler}
                    type="file"
                    accept="image/*"
                    id="profileUpload"
                  >
                    <ImagePlus size={21} />
                    <button className='cursor-pointer'>Image</button>
                  </div>
                </div>             
       )
}

export default AttachMenu;

