import { GoArrowLeft } from 'react-icons/go';


const ChatHeader = ({isOnline, isLargeScreen, backToHomePage, selectedUser }) => {
    return (
        <div className="flex items-center gap-2 shadow-gray-300 shadow  md:px-12 px-6 md:py-3 py-2 fixed bg-[var(--homepage-white)] w-full right-0 top-0 md:w-[calc(100%-448px)]">
            <GoArrowLeft
                size={25}
                className={!isLargeScreen ? 'text-black' : 'hidden'}
                onClick={backToHomePage}
            />

            <div className="flex items-center relative w-12 h-12">
                <img
                    src={selectedUser?.profilePhoto}
                    alt="user-profile"
                    className="md:w-full md:h-full h-10 w-10 object-cover rounded-full border-2 border-gray-300 shadow-md"
                />

                <span className={isOnline ? "absolute bottom-9 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" : ""}></span>
            </div>
            <p className="text-black">{selectedUser?.fullName}</p>
        </div>
    )

}

export default ChatHeader;