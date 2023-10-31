import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Toast.css';

function Toast ({ message, type = 'error', duration = 1500, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose && onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return ReactDOM.createPortal(
        <div onClick={() => onClose(message)} className={`toasts_item toasts_item_${type}`}>
            {message}
        </div>,
        document.querySelector('.toasts')
    );
}

export default Toast;
