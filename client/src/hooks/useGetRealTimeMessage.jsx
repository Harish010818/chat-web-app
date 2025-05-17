import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { setMessages } from "../useRedux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    
    const dispatch = useDispatch();

    useEffect(() => {

        socket?.on("newMessage", (newMessage) => {

            dispatch(setMessages([...messages, newMessage]));         
        });

    return () => socket?.off("newMessage");    
    }, [socket, messages]);

};

export default useGetRealTimeMessage;

