import React, {useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import { setMessages } from '../useRedux/messageSlice';
import toast from 'react-hot-toast';

const SendInput = () => {
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const {selectedUser} = useSelector(store=>store.user);

    const {messages} = useSelector(store=>store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/message/send/${selectedUser?._id}`, 
                {message}, 

                {
                headers:{
                    'Content-Type':'application/json'
                },
                
                withCredentials:true
            });
            
            dispatch(setMessages([...messages, res?.data?.newMessage]))

        } catch (error) {
            toast.error(error.response.data.message);

            console.log(error);
        } 
        
        setMessage("");
    }

    return (
        <form 
        onSubmit={onSubmitHandler} 
        className='md:px-12 mb-3 md:mt-[550px] fixed'>
            <div className='fixed md:w-194'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='text-gray-600  border  border-gray-300 bg-white focus:outline-none focus:ring-1  text-sm rounded-lg block w-full p-3'
                />
                <button type="submit" className='text-gray-600 absolute flex inset-y-0 end-0 items-center pr-4'>
                <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput