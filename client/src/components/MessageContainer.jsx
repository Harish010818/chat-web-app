import SendInput from './SendInput'
import { useSelector} from 'react-redux'
import Messages from "./Messages"

const MessageContainer = () => {

    const {selectedUser, authUser, onlineUsers} = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);
    
    return (
        <>
           {
            selectedUser !== null ? 
            (
                <div className="md:ml-96 min-h-screen grid bg-[var(--chat-bg)] w-228 fixed h-screen">

                            <div className="flex items-center gap-2 shadow-gray-300 shadow  md:px-12 md:py-3 fixed bg-[var(--homepage-white)] w-full right-0 top-0 left-112">
                                <div className="relative w-12 h-12">
                                    <img
                                        src={selectedUser?.profilePhoto}
                                        alt="user-profile"
                                        className="w-full h-full object-cover rounded-full border-2 border-gray-300 shadow-md"
                                    />

                                  <span className={isOnline ? "absolute bottom-9 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" : ""}></span>
                                </div>
                                <p className="text-black">{selectedUser?.fullName}</p>
                            </div>  
                    <Messages />
                    <SendInput />
                </div>
            )
              : 
                ( 
                    <div className='md:ml-180 flex flex-col justify-center text-[var(--dark-blue)]'>
                        <h1 className='text-4xl font-bold tracking-wider'>Hi,
                           {authUser?.fullName}! 
                        </h1>
                        <h1 className='text-2xl'>Let's start conversation...</h1>
                    </div>
                )
            }
       </>
    )
}

export default MessageContainer