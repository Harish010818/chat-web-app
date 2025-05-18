import Message from './Message'
import { useGetMessages } from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {

   useGetMessages();

   useGetRealTimeMessage();

    const { messages } = useSelector(store => store.message);
    console.log(messages);

    return (
        <div className='md:px-12 md:mt-[75px] md:pt-8 overflow-auto gap-1 grid md:pb-24'>
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