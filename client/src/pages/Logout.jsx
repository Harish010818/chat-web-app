import { AiOutlineLogout } from "react-icons/ai";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUser, setSelectedUser } from '../useRedux/userSlice';
import { setMessages } from '../useRedux/messageSlice';
import { useEffect, useState } from "react";

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const uploadImgHandler = async (e) => {
        e.preventDefault();

        const file = e.target.files[0]; //user-selected file
        if (!file) return;

        const formData = new FormData();

        formData.append("profilePhoto", file);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/user/upload-profile/${authUser._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res) {
                toast.success("Profile photo updated successfully");
                dispatch(setAuthUser(res.data));
            }
        } catch (err) {
            toast.error("Failed to upload image");
            console.error("Upload failed:", err);
        }
    };


    const logoutHandler = async () => {
        try {

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
                {
                    withCredentials: true
                });

            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUser(null));
            dispatch(setSelectedUser(null));

        } catch (error) {
            console.log(error);
        }
    }

    // ✅ Render only if: mobile && no selected user || always show on large screen
    const shouldShowLogout = isLargeScreen || selectedUser === null;

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={uploadImgHandler}
                className="hidden"
                id="profileUpload"
            />

            <label htmlFor="profileUpload" className="absolute w-12 h-12 top-3 left-2 cursor-pointer group">
                {authUser?.profilePhoto ? (
                    <img
                        src={`${authUser?.profilePhoto}`}
                        alt="user-profile"
                        className="w-full h-full object-fit rounded-full border-2 border-gray-300 shadow-md"
                    />
                ) : (
                    <div className="w-full h-full rounded-full border-2 border-gray-300 shadow-md bg-white flex items-center justify-center relative">
                        <FaUserCircle className="w-12 h-12 text-gray-400" />

                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaCamera className="w-5 h-5 text-white" />
                        </div>
                    </div>
                )}
            </label>

            {shouldShowLogout && (
                <div className="md:text-white text-[var(--office-blue)] absolute md:bottom-5 md:left-3 md:top-auto md:right-auto z-10 right-4 top-8">
                    <div className="group relative cursor-pointer">
                        <div className="absolute left-14 top-2 z-10 bg-[var(--rich-black)] bg-opacity-70 text-[var(--homepage-white)] text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Logout
                        </div>

                        <div
                            onClick={logoutHandler}
                            className="p-1 rounded hover:bg-white/15 hover:bg-opacity-10 transition-colors duration-200 group"
                        >
                            <AiOutlineLogout size={27} />
                        </div>
                    </div>
                </div>
            )}
        


        </>
    );
};

{/* <BsThreeDotsVertical /> */}