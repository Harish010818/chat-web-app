import axios from "axios"
import { useEffect } from "react"
import { setOtherUser } from "../useRedux/userSlice"
import { useDispatch } from 'react-redux';

export const useGetOtherUsers = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {

          const fetchOtherUsers = async() => {
               try {
                  const res = await axios.get(`http://localhost:3000/api/v1/user/`, 
                    {
                      withCredentials: true
                    } 

                );
                
                dispatch(setOtherUser(res.data));  
                }
                catch(err){
                  console.error(err);
               }     
          } 
      
        fetchOtherUsers()   
    }, [])    
}   