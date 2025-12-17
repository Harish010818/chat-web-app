import { useEffect } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSocket } from "../useRedux/socketSlice";
import { setOnlineUsers } from "../useRedux/userSlice";

export const useSocket = () => {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {

    if (authUser) {
        
      const socketio = io(`${import.meta.env.VITE_API_URL}`, 
      { query: { userId: authUser._id }, });

      console.log(socketio);

      dispatch(setSocket(socketio));
      
      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketio.off("getOnlineUsers"); //prevent multiple listeners
        socketio.close();               //it will trigger disconnection event of socket on the server side
      };
    } 
    
    else {
        
        if (socket) {
            socket.close();
            dispatch(setSocket(null));
        }
    }
  }, [authUser]);
};
