import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showNotifications = (toastifyType, message) => {

    const messageType = Array.isArray(message);
    let showMessage = message;

    if(messageType){
        showMessage = "";
        for(const msg of message){
            showMessage += `${msg}. `
        }
    }

    switch (toastifyType) {
        case 'success':
            toast.success(showMessage);
            break;
        case 'error':
            toast.error(showMessage);
            break;
        default:
            toast.info(showMessage);
    }
}   