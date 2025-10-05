import React, { useEffect, useRef, useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import OtherUsers from '../components/users/OtherUsers';
import { setOtherUser } from '../useRedux/userSlice';
import toast from 'react-hot-toast';
import axios from 'axios';


const Sidebar = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState("");
    const [usersSet, setUsersSet] = useState(false); // helper flag
    const inputRef = useRef(null);

    const { otherUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    // Handling Users searching from userlist in sidebar
    useEffect(() => {
        if (!usersSet && otherUser && otherUser.length > 0) {
            setUsers(otherUser);
            setUsersSet(true); // dobara kabhi set nahi karega
        }

    }, [otherUser, usersSet]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const getSercherUser = (search) => {

                const matched = users.filter(user =>
                    user.fullName.toLowerCase().startsWith(search.toLowerCase())
                );

                return matched;
            };

            const res = getSercherUser(search);
            dispatch(setOtherUser(res));
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);


    return (
        <div className='md:border-r md:border-slate-300 grid md:w-96 w-full bg-[var(--homepage-white)] fixed h-screen' >

            <div className='md:border-r md:border-slate-300 md:w-96 w-full fixed grid gap-8 md:bg-[var(--homepage-white)] bg-blue-500 py-4 px-8  z-10' >
                <h1 className='text-[var(--rich-black)] text-2xl font-medium' >Messages</h1>
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        className='text-gray-500 md:w-80 w-full px-4 py-1 border rounded-md border-gray-300 bg-white focus:outline-none focus:ring-1 '
                        placeholder='Search...'
                    />
                    <button
                        onClick={() => inputRef.current?.focus()}
                        className="absolute md:left-80  right-9 top-21 text-gray-300  cursor-pointer">
                        <BiSearchAlt2 className='w-6 h-6 outline-none' />
                    </button>
                </div>
            </div>
            <OtherUsers />
        </div>
    )
}

export default Sidebar;

