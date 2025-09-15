import { GoArrowLeft } from 'react-icons/go';
import { FaUserCircle } from "react-icons/fa";


const ChatHeader = ({ isOnline, isLargeScreen, backToHomePage, selectedUser }) => {
    return (
        <div className="flex items-center gap-2 shadow-gray-300 shadow  md:px-12 px-6 md:py-3 py-2 fixed bg-[var(--homepage-white)] w-full right-0 top-0 md:w-[calc(100%-448px)]">
            <GoArrowLeft
                size={25}
                className={!isLargeScreen ? 'text-black' : 'hidden'}
                onClick={backToHomePage}
            />

            <div className="flex items-center relative w-12 h-12">
                {selectedUser?.profilePhoto ? (
                    <img
                        src={`${import.meta.env.VITE_API_URL}${selectedUser?.profilePhoto}`}
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
            <p className="text-black">{selectedUser?.fullName}</p>
        </div>
    )

}

export default ChatHeader;