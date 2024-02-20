/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext  } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useSnackBar } from "../contexts/SnackBarContext";





export default function Todo({todo, handelDeleteTodoClick, handelEditTodoClick}) {
    const {todos, setTodos} = useContext(TodosContext);
    const {showHideSnackBar} = useSnackBar();
    
    

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

    
   


    return(
        <>
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
                        showHideSnackBar("تم تحديث حالة المهمة بنجاح")
                    }}
                />
                {/* === Edit Icon === */}
                <FontAwesomeIcon type="button" icon={faPencil} size="lg" 
                    className="text-blue-500 cursor-pointer transition-all hover:scale-105 hover:text-blue-700"
                    onClick={() => {
                        handelEditTodoClick(todo)
                    }}
                />
                {/* === Delete Icon === */}
                <FontAwesomeIcon type="button" icon={faTrashCan} size="lg" 
                    className="text-red-500 cursor-pointer transition-all hover:scale-105 hover:text-red-700" 
                    onClick={() => {
                        handelDeleteTodoClick(todo)
                    }}
                />
                </div>
            </div>
            
        </>
    )
}