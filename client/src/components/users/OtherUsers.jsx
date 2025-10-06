import OtherUser from './OtherUser';
import { useSelector } from 'react-redux';
import {useGetOtherUsers} from '../../hooks/useGetOtherUsers';
const OtherUsers = () => {
    

    // my custom hook
    useGetOtherUsers();
     
    const { otherUser } = useSelector(store => store.user);

    if (!otherUser) return null; // React me undefined/null handle

    return (
        <div className='pt-[200px] pb-[50px] overflow-auto'>
            {
                otherUser.length > 0 ? (
                    otherUser.map((user) => (
                        <OtherUser key={user._id} user={user} />
                    ))
                ) : (
                    <p className='text-center text-3xl text-gray-500 mt-4'>
                        No such user found...
                    </p>
                )
            }
        </div>
    )
}

export default OtherUsers;
