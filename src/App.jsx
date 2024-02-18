import './App.css'
import TodoList from './components/TodoList'
import { useState } from 'react';
import { TodosContext } from './contexts/todosContext';

// const initialTodos = [
//   {
//       id: uuidv4(),
//       title: "المهمة الأولى",
//       description: "التفاصيل الخاصة بالمهمة",
//       isCompleted: false
//   },
//   {
//       id: uuidv4(),
//       title: "المهمة الثانية",
//       description: "التفاصيل الخاصة بالمهمة",
//       isCompleted: true
//   },
//   {
//       id: uuidv4(),
//       title: "المهمة الثالثة",
//       description: "التفاصيل الخاصة بالمهمة",
//       isCompleted: false
//   },
//   {
//       id: uuidv4(),
//       title: "المهمة الرابعة",
//       description: "التفاصيل الخاصة بالمهمة",
//       isCompleted: false
//   }
// ];


function App() {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <div className="App">
      <TodosContext.Provider value={{todos, setTodos}}>
        <TodoList />
      </TodosContext.Provider>
      </div>
        
    </>
  )
}

export default App
