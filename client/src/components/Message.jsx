import { useEffect, useRef } from "react";
import {useSelector} from "react-redux";

const Message = ({ message }) => {
    
    const scroll = useRef();
    const {authUser, selectedUser} = useSelector(store=>store.user);
    
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    }, [message]);

    
    return (
        <div ref={scroll} className={`w-full flex ${authUser?._id === message?.senderId ? 'justify-end pr-2' : 'justify-start pl-2'} my-1`}>
          <div className={`${authUser?._id === message?.senderId 
            ? 'bg-[var(--dark-blue)] text-[var(--chat-bg)] self-end' 
            : 'bg-[var(--homepage-white)] text-black self-start'} 
            inline-block max-w-[60%] px-3 py-2 rounded-lg shadow text-sm`}>
            
            <div>{message?.message}</div>
            
            <time className="text-xs text-gray-400 flex justify-end mt-1">23:59</time>
          </div>
        </div>
    );
}

export default Message;