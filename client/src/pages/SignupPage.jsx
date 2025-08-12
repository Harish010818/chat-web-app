import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",

  });

  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-[var(--office-blue)] px-4'>
      <div className="text-black w-full max-w-md bg-[var(--office-white)] shadow-xl p-8 space-y-6">
        <h1 className='text-3xl font-bold text-center text-gray-800'>Signup</h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <input
              // name="fullName"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder='Full Name' />
          </div>
          <div>
            <input
              // name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder='Username' />
          </div>
          <div className='relative'>
            <input
              // name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder='Password' />
            {/* <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
          👁️
          </span> */}
          </div>
          <div className='relative'>
            <input
              // name="confirmPassword"
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder='Confirm Password' />
            {/* <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
          👁️
        </span> */}
          </div>
          <div className="flex gap-6 my-4">
            <label className="relative flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="peer appearance-none w-5 h-5 border border-gray-400 rounded bg-white checked:bg-[var(--dark-blue)]"
              />

              {/* Blue Tick shown only when checked */}
              <svg className="absolute w-4 h-4 text-[var(--office-white)] opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-1 text-black">Male</span>
            </label>

            <label className="relative flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="peer appearance-none w-5 h-5 border border-gray-400 rounded bg-white checked:bg-[var(--dark-blue)]"
              />
              <svg className="absolute w-4 h-4 text-[var(--office-white)] opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-1 text-black">Female</span>
            </label>
          </div>

          <div>
            <button
              type='submit'
              className="text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2  bg-[var(--dark-blue)]">
              Signup
            </button>
          </div>
          <p className='text-center my-2'>Already have an account? <Link to="/login" className='text-[var(--dark-blue)]'>login</Link></p>
        </form>
      </div>
    </div>

  )
}

export default SignupPage;