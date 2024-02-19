import './App.css'
import TodoList from './components/TodoList'
import { useState } from 'react';
import { TodosContext } from './contexts/todosContext';
import SnackBar from './components/SnackBar';

import { SnackBarContext } from './contexts/SnackBarContext';

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
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("")

  const showHideSnackBar = (message) => {
    setOpenSnackBar(true);
    setMessage(message);
    setTimeout(() => {
      setOpenSnackBar(false);
    }, 2000);
  }

  return (
    <>
      <SnackBarContext.Provider value={{showHideSnackBar} }>
        <div className="App">
        <SnackBar isVisable={openSnackBar} message={message}/>

        <TodosContext.Provider value={{todos, setTodos}}>
          <TodoList />
        </TodosContext.Provider>
        </div>
      </SnackBarContext.Provider>
    </>
  )
}

export default App
