import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import OtherUsers from './OtherUsers';
import { setOtherUser } from '../useRedux/userSlice';
import toast from 'react-hot-toast';


const Sidebar = () => {

    const [search, setSearch] = useState("");
    const {otherUser} = useSelector(store => store.user);
    const dispatch = useDispatch();
    
    const searchSubmitHandler = (e) => {
        e.preventDefault();

        const conversationUser = otherUser?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));

        if(conversationUser) {
            dispatch(setOtherUser([conversationUser])); 
        } else{
            toast.error("User not found!");
        }
    }

    return (
        <div className = 'border-r border-slate-300 grid w-96 bg-[var(--homepage-white)] fixed h-screen' >

          <div className = 'border-r border-slate-300 w-96 fixed grid gap-8 bg-[var(--homepage-white)] md:py-8 md:px-8  z-10' >
            <h1 className = 'text-[var(--dark-blue)] text-2xl font-medium' >Messages</h1>
                <form
                    onSubmit={searchSubmitHandler} 
                    action=""
                    className ='flex items-center gap-2'>
                    <div>
                        <input
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            className ='text-gray-500 w-80 px-4 py-1 border rounded-md border-gray-300 bg-white focus:outline-none focus:ring-1 ' type="text"
                            placeholder ='Search...'
                        />

                        <button type='submit' className = "absolute left-80 top-25 text-gray-300  cursor-pointer">
                            <BiSearchAlt2 className = 'w-6 h-6 outline-none' />
                        </button>
                    </div>
                </form>
            </div> 
        <OtherUsers />  
    </div>
    )
}

export default Sidebar;

