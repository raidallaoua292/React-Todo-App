import { createContext, useReducer,useContext } from "react";
import todosReduser from "../reducers/todosReducer";

const TodosContext = createContext([]);


const TodosProvider = ({children}) => {
    const [todos, dispatch] = useReducer(todosReduser,[]);
    return (
        <TodosContext.Provider value={{todos, dispatch}}>
            {children}
        </TodosContext.Provider>
    )
}

export const useTodos = () => {
    return useContext(TodosContext);
}
export default TodosProvider;
// export const TodosContext = createContext([]);