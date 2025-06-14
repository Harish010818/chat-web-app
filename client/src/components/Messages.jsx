import Message from './Message'
import { useGetMessages } from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {

   useGetMessages();

   useGetRealTimeMessage();

    const { messages } = useSelector(store => store.message);

    return (
        <div className='md:px-12 px-2 mt-[75px] md:pt-8 pb-24 overflow-auto gap-1 grid'>
            {
               messages && messages?.map((message) => {
                    return (
                       <Message key={message._id} message = {message} />
                    )
               })
            }    
       </div>
    )
}

export default Messages