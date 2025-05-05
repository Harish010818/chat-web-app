// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import axios from "axios";
// import toast from "react-hot-toast";

import { Logout } from "./Logout"
import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar"


const HomePage = () => {    
  return (
    <div className="min-h-screen  bg-[var(--office-blue)] pl-16 relative">
      <Logout />
        <div className='flex min-h-screen overflow-hidden bg-[var(--homepage-white)]'>
          <Sidebar />
          <MessageContainer />
        </div>
    </div>
  )
}

export default HomePage