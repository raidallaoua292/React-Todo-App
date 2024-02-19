import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function SnackBar({ isVisable, message }) {

    if(!isVisable) return null;
return(
    <>
        <div className={`absolute bottom-10 left-2  z-50 card flex items-center  max-w-xs p-4 mb-4 ${"bg-green-100"}`}>
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-200 rounded-lg">
            <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
            </div>
            <div className="ms-3 text-sm font-normal">
            {message}
            </div>
        </div>
        <div className={` `}>
            
        </div>
    </>
)
}