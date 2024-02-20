import { v4 as uuidv4 } from 'uuid';
export default function reducer(currentTodos, action){

    switch(action.type){
        case "add":{
            
                
                const newTodoItem = {
                    id: uuidv4(),
                    title: action.payload.title,
                    description: "التفاصيل الخاصة بالمهمة",
                    isCompleted: false
                }
                const updatedTodos = [...currentTodos, newTodoItem];
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
        
                return updatedTodos;
        
        }
        
        case "delete":{

            const updatedTodos = currentTodos.filter(todo => todo.id !== action.payload.id);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        } 

        case "edit":{
            const updatedTodos = currentTodos.map((todo) => {
                if(todo.id === action.payload.id) 
                return(
                    {...todo, title: action.payload.title, description: action.payload.description}
                );
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }

        case "check":{
            const updatedTodos = currentTodos.map((todo) => {
                if(todo.id === action.payload.id) 
                return(
                    {...todo, isCompleted: !todo.isCompleted}
                );
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }

        case "getTodos":{
            const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
            return storageTodos;
        }

        default:{
            throw Error("Unhandled action type" + action.type)
        }
    }

    return []
}