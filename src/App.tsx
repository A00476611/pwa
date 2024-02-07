import './App.css';
import { ToDoList, ToDoStorage } from './components/ToDoList';
let initialTodos = ToDoStorage.getAll()
function App() {
  return (
    <div className="App">
      <ToDoList initialTodos={initialTodos}/>
    </div>
  );
}

export default App;
