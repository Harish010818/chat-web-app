import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser, setOtherUser, setSelectedUser } from '../useRedux/userSlice';
import { setMessages } from '../useRedux/messageSlice';


export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <div className="mt-2 text-white cursor-pointer bottom-5 left-3 absolute">
            {/* Tooltip (only shows when icon is hovered) */}
            <div className="group relative">
                <div className="absolute left-14 top-2 z-10 bg-[var(--office-blue)] bg-opacity-70 text-[var(--homepage-white)] text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Logout
                </div>

                {/* Icon with hover background */}
                <div
                    onClick={logoutHandler}
                    className="p-1 rounded hover:bg-white/15 hover:bg-opacity-10 transition-colors duration-200 group"
                >
                    <AiOutlineLogout size={30} />
                </div>
            </div>
        </div>

    )
}