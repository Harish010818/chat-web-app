import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../useRedux/messageSlice";

export const useGetMessages = () => {

    const {selectedUser}  = useSelector(store => store.user); 
    const dispatch = useDispatch();
     
    useEffect(() => {

        const fetchMessages = async () => {
            try {
                 const res = await axios.get(`http://localhost:3000/api/v1/message/${selectedUser?._id}`,
                  {
                    withCredentials : true
                  }
               );  

               dispatch(setMessages(res.data));

            } catch(err){
               console.log(err)
            }
        }
     
        fetchMessages();    
    }, [selectedUser?._id])
}