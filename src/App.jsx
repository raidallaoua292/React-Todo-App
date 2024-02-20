import './App.css'
import TodoList from './components/TodoList'

import { SnackBarProvider } from './contexts/SnackBarContext';
import TodosProvider from './contexts/todosContext';

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
    return (
    <TodosProvider>
      <SnackBarProvider  >
        <div className="App">
          <TodoList /> 
        </div>
      </SnackBarProvider>
    </TodosProvider>
  )
}

export default App
