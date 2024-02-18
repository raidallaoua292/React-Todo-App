import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect, useMemo } from "react";
import { TodosContext } from "../contexts/todosContext";







export default function TodoList() {
    const {todos, setTodos} = useContext(TodosContext);
    const [newTodo, setNewTodo] = useState("")
    const [filter, setFilter] = useState("all");
    
    /* ==== Fillteration todos === */
    const completedTodos = useMemo(() => {
         return todos.filter((todo)=>{
            console.log("todo Completed");
            return todo.isCompleted === true;
        });
    },[todos]);
    
    const unCompletedTodos = useMemo(() => {
        return todos.filter((todo)=>{
            console.log("todo UnCompleted");
            return todo.isCompleted === false;
        });
    },[todos])


    /* ==== Fillteration todos === */

    /* === Todo Items === */
    let todoItems = todos;
    
    if(filter === "all") {
            todoItems = todos.map((todo) => {
                return <Todo key={todo.id} todo={todo} />
            })
        } else if(filter === "completed") {
            todoItems = completedTodos.map((todo) => {
                return <Todo key={todo.id} todo={todo} />
            })
        } else if(filter === "non-completed") {
            todoItems = unCompletedTodos.map((todo) => {
                return <Todo key={todo.id} todo={todo} />
            })
        }
    /* === Todo Items === */
    
    /* === Local Storage === */
    useEffect(() => { 
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storageTodos);
        
    },[]);
    /* === Local Storage === */

    /* === Add Todo === */
    const hahdelAddTodoClick = () => {
        if(newTodo === "") return;
        const newTodoItem = {
            id: uuidv4(),
            title: newTodo,
            description: "التفاصيل الخاصة بالمهمة",
            isCompleted: false
        }
        const updatedTodos = [...todos, newTodoItem];
        setTodos(updatedTodos);

        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        setNewTodo("");
    }
    /* === Add Todo === */
    


    return(
        <>
            <div className="max-w-lg w-96 ma card bg-slate-100 my-3 max-md:scale-90">
            {/* Todo title */}
                <h1 className="text-4xl ">مهامي</h1>
                <hr className="my-3" />

                {/* === Filter Button === */}
                <div value={filter} 
                    onClick={(e) => setFilter(e.target.value)}
                    className="inline-flex rounded-md shadow-sm ">
                    <button value={"all"} type="button" className={
                        filter === "all" ?
                        "btn rounded-s-lg rounded-e scale-110 active:scale-95" 
                        : "btn rounded-s-lg rounded-e hover:scale-110 active:scale-95 bg-indigo-500 "
                    }>
                        الكل
                    </button>
                    <button value={"non-completed"} type="button" className={
                        filter === "non-completed" ?
                        "btn rounded scale-110 active:scale-95" 
                        : "btn rounded hover:scale-110 active:scale-95 bg-indigo-500 "
                    
                    }>
                        الغير مكتملة
                    </button>
                    <button value={"completed"} type="button" className={
                        filter === "completed" ?
                        "btn rounded-e-lg rounded-s scale-110 active:scale-95" 
                        : "btn rounded-e-lg rounded-s hover:scale-110 active:scale-95 bg-indigo-500 "
                    }>
                        المنجزة
                    </button>
                </div>

                {/* === Todo Items === */}
                <div className=" w-full max-h-[350px] overflow-auto p-2  min-w-fit mt-3">
                {todoItems}
                </div>
                {/* === Add Todo  === */}
                <div className="grid grid-cols-12 gap-2 mt-3">
                    <input type="text"
                        className="col-span-8 outline-neutral-400 card p-2 text-truncate " 
                        placeholder="أضف مهمة جديدة" 
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button type="submit" className="col-span-4 btn rounded-lg active:scale-95"
                        onClick={() => {
                            hahdelAddTodoClick()
                        }}
                    >
                    أضف
                    </button>
                </div>
            </div>
            
        </>
    )
}