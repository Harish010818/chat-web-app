import Message from './Message'
import { useGetMessages } from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {

   useGetMessages();

   useGetRealTimeMessage();

    const { messages } = useSelector(store => store.message);

    return (
        <div className='md:px-12 px-2 mt-[75px] md:pt-8 md:pb-24 pb-32 overflow-auto gap-1 grid'>
         <div className='flex justify-center  md:h-8 sm:h-8 h-16'>
            <h1 className=' bg-[#e0f2f1] text-[#004d40] text-[13px] px-2 py-1 rounded-md text-center shadow-sm'>
                Messages are end-to-end encrypted. Only people in this chat can read the messages.
            </h1>
         </div>
         {
            messages && messages?.map((message) => {
               return (
                <Message key={message._id} message={message} />
               )
         })
  }
</div>

    )
}

export default Messages