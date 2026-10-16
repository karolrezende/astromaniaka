import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { CircleCheck, LucideIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

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

    return createPortal(
        <div
            role="status"
            className={`glass-strong fixed right-4 top-4 z-50 animate-toast-in items-center gap-3 px-4 py-3 text-sm font-medium text-slate-100 ${visible ? 'flex' : 'hidden'}`}
        >
            <span className='flex h-7 w-7 items-center justify-center rounded-full bg-gradient-accent text-white'>
                {Icon ? <Icon size={16} /> : <CircleCheck size={16} />}
            </span>
            {message}
        </div>,
        document.body
    );
};

export default Popup;
