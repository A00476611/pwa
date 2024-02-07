import { useEffect, useState } from 'react';
import './App.css';
import { ToDoList, ToDoStorage } from './components/ToDoList';
import {MdSunny, MdModeNight} from 'react-icons/md'
let initialTodos = ToDoStorage.getAll()
function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"))
  const toggleTheme = () => {
    setTheme(theme => theme == "dark" ? "light" : "dark")    
  }

  useEffect(()=>{
    if(theme){
      document.querySelector("body")?.setAttribute("theme", theme)
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  return (
    <div className="App">
      <div className='nav'>
        <h1> My Todos </h1>
        <button onClick={toggleTheme}>
          {theme =="dark" ? <MdModeNight /> : <MdSunny/>}
        </button>
      </div>
      <ToDoList initialTodos={initialTodos}/>
    </div>
  );
}

export default App;
