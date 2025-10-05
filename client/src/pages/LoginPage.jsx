import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast"
import axios from "axios";
import { setAuthUser } from '../useRedux/userSlice';

const LoginPage = () => {
  const [user, setUser] = useState({
      username : "",
      password : "",
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post( `${import.meta.env.VITE_API_URL}/api/v1/user/login`, 
         user, 
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }  
    );

    if(res){
        navigate("/home");
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data));
    }


    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 px-4">
      <div className='text-black w-full max-w-md bg-[var(--office-white)] shadow-xl p-8 space-y-6 rounded-2xl'>
        <h1 className='text-3xl font-bold text-center text-gray-800'>Login</h1>
        <form onSubmit={onSubmitHandler} className="space-y-5">

          <div>
            <input
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <input
              name="password" 
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="password"
              placeholder='Password' />
          </div>
            <button type="submit" className="text-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-[var(--rich-black)] cursor-pointer">Login</button>
          <p className='text-center my-2'>Don't have an account? <Link to="/signup" className='text-[var(--dark-blue)]' > signup </Link></p>
          <div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;