import SendInput from './SendInput'
import { useSelector } from 'react-redux'
import Messages from "./Messages"
import { useEffect, useState } from 'react'

const MessageContainer = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 762);

    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 762)
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className={(isLargeScreen && selectedUser == null)|| selectedUser !== null ?  `md:ml-96 min-h-screen grid bg-[var(--chat-bg)] md:w-[calc(100%-448px)] w-full fixed h-screen` : ``}>
            {selectedUser !== null ?
                    (
                        <>
                            <div className="flex items-center gap-2 shadow-gray-300 shadow  md:px-12 px-6 md:py-3 py-2 fixed bg-[var(--homepage-white)] w-full right-0 top-0 md:w-[calc(100%-448px)]">
                                <div className="relative w-12 h-12">
                                    <img
                                        src={selectedUser?.profilePhoto}
                                        alt="user-profile"
                                        className="md:w-full md:h-full h-10 w-10 object-cover rounded-full border-2 border-gray-300 shadow-md"
                                    />

                                    <span className={isOnline ? "absolute bottom-9 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" : ""}></span>
                                </div>
                                <p className="text-black">{selectedUser?.fullName}</p>
                            </div>
                            <Messages />
                            <SendInput />
                        </>
                    )
                    :
                    (
                        isLargeScreen && (
                            <div className='flex items-center justify-center text-[var(--dark-blue)]'>
                                <div>
                                    <h1 className='text-4xl font-bold tracking-wider'>Hi,
                                        {authUser?.fullName}!
                                    </h1>
                                    <h1 className='text-2xl'>Let's start conversation...</h1>
                                </div>
                            </div>
                        )
                    )}
        </div>
    )
}

export default MessageContainer