import  { useState, useEffect, Dispatch, SetStateAction } from 'react';
import './index.css'
import { CircleCheck, LucideIcon } from 'lucide-react';

const Popup = ({ message, setMessage, duration = 3000, Icon }: { message: string, duration?: number, Icon?: LucideIcon, setMessage: Dispatch<SetStateAction<string>> }) => {
    const [visible, setVisible] = useState(message ? true : false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setMessage('')

            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    return (
        <div className={`popup px-5 font-medium text-nowrap text-blue-900 rounded-lg p-2 bg-white ${visible ? 'flex' : 'hidden'}`} >
            <div className='flex gap-2 items-center justify-center'>
                {Icon ? <Icon size={20}/> : <CircleCheck className='text-blue-900' size={20}/>}
                {message}
            </div>
        </div>
    );
};

export default Popup;
