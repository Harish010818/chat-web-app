import { useEffect, useRef } from "react";
import {useSelector} from "react-redux";

const Message = ({ message }) => {
    
    const scroll = useRef();
    const {authUser, selectedUser} = useSelector(store=>store.user);
    
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);

    return (
        <div ref={scroll}>
            <div className={`${authUser?._id == message?.senderId ? 'bg-[var(--dark-blue)] text--[var(--chat-bg)]' : 'bg-[var(--homepage-white)] text-black'} inline-block max-w-[60%] px-2 py-2 space-y-1 shadow-gray-300 rounded-md shadow text-sm`}>
                <div> 
                   {message?.message}
                </div>

                <time className="text-xs text-gray-400 flex justify-end">12:45</time>
            </div>

        </div>
    )
}

export default Message;