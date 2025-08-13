import axios from "axios"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../useRedux/messageSlice";

export const useGetMessages = () => {

    const { selectedUser } = useSelector(store => store.user);
    const { messageDelete } = useSelector(store => store.message);
    const prevUserId = useRef(null);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/message/${selectedUser?._id}`,
                    {
                        withCredentials: true
                    }
                );
                
                dispatch(setMessages(res.data));
                
            } catch (err) {
                console.log(err)
            }
        }
        
        const isUserChanged = prevUserId.current !== selectedUser?._id;
        
        if(!isUserChanged && !messageDelete){
           return;
        }
        
        if(isUserChanged || messageDelete){
           fetchMessages();
           prevUserId.current=selectedUser?._id; 
        }
        
    }, [selectedUser?._id, messageDelete])
}