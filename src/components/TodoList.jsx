import Todo from "./Todo";
import { useState  , useEffect, useMemo, useReducer, useContext } from "react";
import { useSnackBar } from "../contexts/SnackBarContext";
import {DeletePopUp, EditPopUp} from "./Modal";
import { useTodos } from "../contexts/todosContext";







export default function TodoList() {
    const {showHideSnackBar} = useSnackBar();

    const {todos, dispatch} = useTodos();

    const [newTodo, setNewTodo] = useState("")
    const [filter, setFilter] = useState("all");
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editTodo, setEditTodo] = useState({title: "", description: ""});
    const [modalTodo, setModalTodo] = useState(null)
    



    
    
    
    /* === Local Storage === */
    useEffect(() => { dispatch({type: "getTodos"});},[]);
    /* === Local Storage === */

    /* === Add Todo === */
    const hahdelAddTodoClick = () => {
        if(newTodo === "") return;
        dispatch({type: "add", payload: {title: newTodo}})
        setNewTodo("");
        showHideSnackBar("تمت إضافة المهمة بنجاح");
    }
    /* === Add Todo === */
    
    
    /* === Handle Delete Todo === */
    
    function handelDeleteTodoClick(todo) {
        setModalTodo(todo);
        console.log("Delete" + todo.id)
        setIsDelete(true);
    }
    /* === Handle Delete Todo === */

    /* === Handle Edit Todo === */
    function handelEditTodoClick(todo) {
        setModalTodo(todo);
        setEditTodo({title: todo.title, description: todo.description});
        console.log("Edit" + todo.id)
        setIsEdit(true);
    }
    /* === Handle Edit Todo === */

     /* === Hndel Close Delete PopUp === */
     function handelCloseDeletePopUp() {
        setIsDelete(false);
    }
    /* === Hndel Close Delete PopUp === */

    /* === confirme Delete Todo === */
    function confrimeDeleteTodo() {
        let todoId = modalTodo.id;
        dispatch({type: "delete", payload: {id: todoId}})
        handelCloseDeletePopUp()
        showHideSnackBar("تم حذف المهمة بنجاح")
    }
    /* === confirme Delete Todo === */

    /* === Hndel Close Edit PopUp === */
    function handelCloseEditPopUp() {
        setIsEdit(false);
    }
    /* === Hndel Close Edit PopUp === */
    
    /* === Confrime Edit Todo === */
    function confrimeEditTodo() {
        let todoId = modalTodo.id;
        dispatch({type: "edit", payload: {
            id: todoId,
            title: editTodo.title,
            description: editTodo.description
        }})
        handelCloseEditPopUp()
        showHideSnackBar("تم تعديل المهمة بنجاح")
        
    }
    /* === Confrime Edit Todo === */
    
   
   

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
                return <Todo key={todo.id} todo={todo}
                    handelEditTodoClick={handelEditTodoClick}
                    handelDeleteTodoClick={handelDeleteTodoClick} 
                />
            })
        } else if(filter === "completed") {
            todoItems = completedTodos.map((todo) => {
                return <Todo key={todo.id} todo={todo} 
                    handelEditTodoClick={handelEditTodoClick}
                    handelDeleteTodoClick={handelDeleteTodoClick} 
                    
                />
            })
        } else if(filter === "non-completed") {
            todoItems = unCompletedTodos.map((todo) => {
                return <Todo key={todo.id} todo={todo} 
                    handelEditTodoClick={handelEditTodoClick}
                    handelDeleteTodoClick={handelDeleteTodoClick} 
                />
            })
        }
   /* === Todo Items === */

    /* === Edit Children === */
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
    /* ** Edit Cheldern ** */
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
            <DeletePopUp isVisable={isDelete} handelClose={handelCloseDeletePopUp} handelDelete={confrimeDeleteTodo}/>
            <EditPopUp isVisable={isEdit} handelClose={handelCloseEditPopUp} handelEdit={confrimeEditTodo}>{editCheldern}</EditPopUp>
        </>
    )
}