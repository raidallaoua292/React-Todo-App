/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";
import {DeletePopUp, EditPopUp} from "./Modal";




export default function Todo({todo}) {
    const {todos, setTodos} = useContext(TodosContext);
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editTodo, setEditTodo] = useState({title: todo.title, description: todo.description});

    /* === Event Handlers === */
    const todoId = todo.id;
    /* ===  Handle Check Todo === */
    function handelCheckTodoClick  ()  {
        const newTodos = todos.map((todo) => {
            if(todo.id === todoId) return {...todo, isCompleted: !todo.isCompleted};
            return todo;
        });
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos))
    }
    /* === Handle Check Todo === */

    /* === Hndel Close Delete PopUp === */
    function handelCloseDeletePopUp() {
        setIsDelete(false);
    }
    /* === Hndel Close Delete PopUp === */

    /* === confirme Delete Todo === */
    function confrimeDeleteTodo() {
        const newtodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(newtodos)
        localStorage.setItem("todos", JSON.stringify(newtodos))
        console.log("Delete")
    }
    /* === confirme Delete Todo === */

    /* === Hndel Close Edit PopUp === */
    function handelCloseEditPopUp() {
        setIsEdit(false);
    }
    /* === Hndel Close Edit PopUp === */
    
    /* === Confrime Edit Todo === */
    function confrimeEditTodo() {
        const newTodos = todos.map((todo) => {
            // eslint-disable-next-line react/prop-types
            if(todo.id === todoId) 
            return(
                {...todo, title: editTodo.title, description: editTodo.description}
            );
            return todo;
        });
        setTodos(newTodos);
        handelCloseEditPopUp()
        localStorage.setItem("todos", JSON.stringify(newTodos))
    }
    /* === Confrime Edit Todo === */

   

    const editCheldern = (
        <>
            <input type="text" 
                className="card outline-neutral-400 p-2 w-full mt-3" 
                placeholder="عنوان المهمة"
                value={editTodo.title}
                onChange={(e) => setEditTodo({...editTodo, title: e.target.value})}
            />
            <textarea 
                className="card outline-neutral-400 p-2 w-full mt-3" 
                placeholder="وصف المهمة"
                value={editTodo.description}
                onChange={(e) => setEditTodo({...editTodo, description: e.target.value})}
            />
        </>
    )


    return(
        <div >
            <div className="card p-2 grid grid-cols-12 h-fit z-50 hover:scale-105 mt-3">
                <div className={
                    todo.isCompleted ? 
                    "flex flex-col col-span-8 border-l-2 pl-1 line-through text-neutral-400"
                    : "flex flex-col col-span-8 border-l-2 pl-1"
                }>
                    <h4 className="ml-2 text-lg font-semibold">{todo.title}</h4>
                    <p className="text-base text-neutral-500">{todo.description}</p>
                </div>
                <div className="flex justify-around  items-center gap-1 col-span-4 ">
                {/* === Check Icon === */}
                <FontAwesomeIcon type="button" icon={faCircleCheck} size="lg"
                    
                    className={
                        todo.isCompleted ?  
                        "text-green-500 cursor-pointer transition-all hover:scale-125 hover:text-neutral-500"
                        : "text-neutral-500 cursor-pointer transition-all hover:scale-125 hover:text-green-500"
                    } 
                    onClick={() => {
                        handelCheckTodoClick()
                    }}
                />
                {/* === Edit Icon === */}
                <FontAwesomeIcon type="button" icon={faPencil} size="lg" 
                    className="text-blue-500 cursor-pointer transition-all hover:scale-105 hover:text-blue-700"
                    onClick={() => {
                        setIsEdit(true)
                    }}
                />
                {/* === Delete Icon === */}
                <FontAwesomeIcon type="button" icon={faTrashCan} size="lg" 
                    className="text-red-500 cursor-pointer transition-all hover:scale-105 hover:text-red-700" 
                    onClick={() => {
                        setIsDelete(true)
                    }}
                />
                </div>
            </div>
            <DeletePopUp isVisable={isDelete} handelClose={handelCloseDeletePopUp} handelDelete={confrimeDeleteTodo}/>
            <EditPopUp isVisable={isEdit} handelClose={handelCloseEditPopUp} handelEdit={confrimeEditTodo} children={editCheldern}/>
        </div>
    )
}