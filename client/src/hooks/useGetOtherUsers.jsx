import axios from "axios"
import { useEffect } from "react"
import { setOtherUser } from "../useRedux/userSlice"
import { useDispatch, useSelector } from 'react-redux';


export const useGetOtherUsers = () => {
    
    const { messages } = useSelector(store => store.message);
    const dispatch = useDispatch();
    useEffect(() => {

          const fetchOtherUsers = async() => {
               try {
                  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/`, 
                    {
                      withCredentials: true
                    } 

                );
                
                console.log(res.data);
                dispatch(setOtherUser(res.data));  
                }
                catch(err){
                  console.error(err);
               }     
          } 
      
        fetchOtherUsers()   
    }, [messages])    
}   