import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useGetMessages } from '../../hooks/useGetMessages';
import useGetRealTimeMessage from '../../hooks/useGetRealTimeMessage';
import { editMessage, unsendMessage } from '../../useRedux/messageSlice';
import { useEffect } from 'react';


const Messages = () => {

    const dispatch = useDispatch();
    const [activeMessageId, setActiveMessageId] = useState(null);
    const { socket } = useSelector(store => store.socket);

    useEffect(() => {
        if (!socket) return;
        
        socket.on("messageDeleted", (id) => {
            dispatch(unsendMessage(id));
        });
        
        return () => {
            socket.off("messageDeleted");
        };
    }, [socket, dispatch])
    
    
    useEffect(() => {
        if (!socket) return;
        
        socket.on("messageEdited", ({ id, newText }) => {
            dispatch(editMessage({ id, newText }));
        });

        return () => socket.off("messageEdited");
    }, [socket, dispatch]);


    useGetMessages();
    useGetRealTimeMessage()

    const { messages } = useSelector(store => store.message);

    return (
        <div className='md:px-12 px-2 mt-[75px] md:pt-8 md:pb-24 pb-32 overflow-auto gap-1 grid'>
            <div className='flex justify-center  md:h-8 sm:h-8 h-16'>
                <h1 className=' bg-[#e0f2f1] text-[#004d40] text-[13px] px-2 py-1 rounded-md text-center shadow-sm'>
                    Messages are end-to-end encrypted. Only people in this chat can read the messages.
                </h1>
            </div>
            {
                messages && messages?.map((message) => {
                    return (
                        <Message
                            key={message._id}
                            message={message}
                            activeMessageId={activeMessageId}
                            setActiveMessageId={setActiveMessageId}
                        />
                    )
                })
            }
        </div>

    )
}

export default Messages