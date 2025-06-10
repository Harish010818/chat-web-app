import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../useRedux/userSlice';
import moment from "moment";
const OtherUser = ({ user }) => {

    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }

    const formatTime = (timestamp) => {
        const now = moment();
        const diff = now.diff(moment(timestamp), 'days')

        if(diff < 1){
            return `${moment(timestamp).format('D/MMM/YYYY')}`;
        }  else if(diff === 1){
            return `${moment(timestamp).format('D MMM YYYY')}`;
        } else {
            return moment(timestamp).format('D MMM YYYY');
        }
    }

    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`${user?._id == selectedUser?._id ? "bg-zinc-200" : ""}  flex gap-4 text-black items-center hover:bg-zinc-200 py-3 cursor-pointer border-b-1 border-slate-300 pl-8`}
            >
                <div className="relative w-12 h-12">
                    <img
                        src={user?.profilePhoto}
                        alt="user-profile"
                        className="w-full h-full object-cover rounded-full border-2 border-gray-300 shadow-md"
                    />
                    <span className={isOnline ? "absolute bottom-9 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" : ""}></span>
                </div>

                <div className='flex'>
                    <div>
                        <p>{user?.fullName}</p>
                        <p className='text-sm text-gray-500'>
                            {user?.lastMessage?.length > 32
                                ? user.lastMessage.slice(0, 32) + "....."
                                : user?.lastMessage || "Hey! I am using this chatapp..."}
                        </p>
                </div>
                <time className="text-xs text-gray-400 ">
                    {
                      user?.lastMessage
                            ? formatTime(user.createdAt)
                            : ''
                    }
                </time>                    
                </div>
            </div>
        </>
    )
}

export default OtherUser