import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";


/* === Delete PopUp === */
export function DeletePopUp({ isVisable , handelClose, handelDelete, children}) {
    if(!isVisable) return null;
    return(
        <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={handelClose}
        />
            <div className="absolute top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] z-50 flex items-center justify-center">
                <div className="card bg-white w-80 max-sm:w-64 p-5 rounded-lg">
                    <h1 className="text-2xl font-semibold">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-500 pl-2" size="lg" />
                    هل أنت متأكد من حذف المهمة؟
                    </h1>
                    <p className="text-neutral-500 mt-2">  لا يمكنك التراجع عن هذا الإجراء لاحقا</p>
                    <div className="flex gap-3 items-center justify-end mt-5">
                        <button onClick={handelClose}
                            className="btn rounded-lg bg-green-600 hover:bg-green-500">إلغاء</button>
                        <button onClick={handelDelete}
                            className="btn rounded-lg bg-red-600 hover:bg-red-500">نعم</button>
                    </div>
                </div>
            </div>
        </>
    )
}
/* === Delete PopUp === */

/* === Edit PopUp === */
export function EditPopUp({ isVisable , handelClose, handelEdit, children}) {
    if(!isVisable) return null;
    return(
        <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-40"
            onClick={handelClose}
        />
            <div className="absolute top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] z-50 flex items-center justify-center">
                <div className="card bg-white w-80 max-sm:w-64 p-5 rounded-lg">
                    <h1 className="text-2xl font-semibold">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-blue-500 pl-2" size="lg" />
                    تعديل المهمة
                    </h1>
                    {children}
                    <div className="flex gap-3 items-center justify-end mt-5">
                        <button onClick={handelClose}
                            className="btn rounded-lg bg-green-600 hover:bg-green-500">إلغاء</button>
                        <button onClick={handelEdit}
                            className="btn rounded-lg">تعديل</button>
                    </div>
                </div>
            </div>
        </>
    )
}


