import React, { useEffect } from 'react'
import OtherUser from './OtherUser';
import { useGetOtherUsers } from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';

const OtherUsers = () => {

    //my custom hook
    useGetOtherUsers();
     
    const { otherUser } = useSelector(store => store.user);

    useEffect(() => {
         console.log("🟢 Redux Users Updated", otherUser);
    }, [otherUser])

    if ( !otherUser ) return; // early return in react
     
    return (
        <div className='mt-[200px] overflow-auto'>
              {
                otherUser?.map((user) => {
                        return (
                            <OtherUser key={user._id} user={user}/>
                        )
                 })
              }    
        </div>
    )
}

export default OtherUsers