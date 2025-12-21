import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { Plus, SmilePlus } from 'lucide-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../../useRedux/messageSlice';
import toast from 'react-hot-toast';

const SendInput = ({setAttachMenuOpen, menuBtnRef }) => {
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const { selectedUser } = useSelector(store => store.user);

    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/message/send/${selectedUser?._id}`,
                { message },

                {
                    headers: {
                        'Content-Type' : 'application/json'
                    },

                    withCredentials: true
                });

            dispatch(setMessages([...messages, res?.data?.newMessage]))

        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        }

       setMessage("");
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className="fixed bottom-0 right-0 md:w-[calc(100%-448px)] w-full px-4 md:px-12 py-3 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] z-10"
        >
            <div className="relative w-full max-w-screen-lg mx-auto">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Type a message..."
                    className="w-full text-gray-600 border border-gray-300 bg-white focus:outline-none focus:ring-1 text-sm rounded-lg pl-18 pr-10 py-3"
                />
                <div className='absolute left-3 top-3 inset-y-0 text-blue-500'>
                    <div className='flex gap-1'>
                       <Plus ref={menuBtnRef} size={24} className='cursor-pointer' onClick={() => setAttachMenuOpen(p=>!p)}/>
                       <SmilePlus size={23} className='cursor-pointer' />
                     </div>       
                </div>
                <button 
                type="submit" 
                className={`${message ? `text-blue-500` : `text-gray-600`} absolute inset-y-0 right-3 flex items-center cursor-pointer`}>
                    <IoSend
                     size={21}   
                    />
                </button>
            </div>
     </form>
    )
}

export default SendInput;