import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../../useRedux/userSlice';
import { SidebarTimeFormat } from "../../utils/TimeFormat";
import { FaUserCircle} from "react-icons/fa";

const OtherUser = ({ user }) => {

    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }

    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`${user?._id == selectedUser?._id ? "bg-zinc-200" : ""}  flex relative gap-4 text-black items-center hover:bg-zinc-200 py-3 cursor-pointer border-b-1 border-slate-300 pl-8`}
            >
                <div className="relative w-12 h-12">
                    {user?.profilePhoto ? (
                        <img
                            src={`${user?.profilePhoto}`}
                            alt="user-profile"
                            className="w-full h-full object-fit rounded-full border-2 border-gray-300 shadow-md"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full border-2 border-gray-300 shadow-md bg-white flex items-center justify-center relative">
                            <FaUserCircle className="w-12 h-12 text-gray-400" />
                        </div>
                    )}
                    <span className={isOnline ? "absolute bottom-9 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" : ""}></span>
                </div>
                <div className='flex flex-col'>
                    <p>{user?.fullName}</p>
                    <p className='text-sm text-gray-500'>
                        {user?.lastMessage?.length > 32
                            ? user.lastMessage.slice(0, 32) + "....."
                            : user?.lastMessage || "Hey! I am using this chatapp..."}
                    </p>
                </div>

                <div className="absolute top-3 md:left-76 sm:left-125 left-65">
                    <time className="text-xs text-gray-400 ">
                        {
                            user?.lastMessage
                                ? SidebarTimeFormat(user.createdAt)
                                : ''
                        }
                    </time>
                </div>

            </div>
        </>
    )
}

export default OtherUser