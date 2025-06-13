import { AiOutlineLogout } from "react-icons/ai";
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

    const { selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            {shouldShowLogout && (
                <div className="md:text-white text-[var(--office-blue)] absolute md:bottom-5 md:left-3 md:top-auto md:right-auto z-10 right-4 top-8">
                    <div className="group relative cursor-pointer">
                        <div className="absolute left-14 top-2 z-10 bg-[var(--office-blue)] bg-opacity-70 text-[var(--homepage-white)] text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
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