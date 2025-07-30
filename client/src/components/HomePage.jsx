
import { Link } from "react-router-dom";
import { Logout } from "./Logout"
import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar"
import { useSelector } from "react-redux";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--office-blue)] overflow-hidden md:pl-16 relative">
      <>
        <Logout />
        <div className="flex min-h-screen overflow-hidden bg-[var(--homepage-white)]">
          <Sidebar />
          <MessageContainer />
        </div>
      </>
    </div>
  );
};

export default HomePage;