import { FormEventHandler, useEffect, useState } from 'react';
import {MdSunny, MdModeNight} from 'react-icons/md'
import { useTheme } from './hooks/useTheme';
import { ToDoStorage } from './ToDoStorage';
import { PriotityDropDown } from './components/PriorityDropDown';
import { MdRemove as RemoveIcon } from 'react-icons/md';
import './App.css';

export type PriorityIndex = 0 | 1 | 2

export type ToDoItemType = {
  isCompleted:boolean,
  title:string,
  priority:0|1|2
}

function App() {
  const {theme, toggleTheme} = useTheme()

  const [todos, setTodos] = useState(ToDoStorage.getAllTodos())

    const handleAdd:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
        const newItem = formData['newItem']
        const newItemPriority = parseInt(formData['priority'].toString()) as PriorityIndex
        if(!newItem) return
        setTodos((todos):ToDoItemType[] => [...todos, {isCompleted:false, title:newItem.toString(), priority:newItemPriority}]  )
        e.currentTarget.reset()
    }

    const handleItemClick = (index:number, current:boolean) => {
        setTodos(todos => {
            let copy = [...todos]
            copy[index].isCompleted = !current
            return copy
        })
    }

    const handleItemRemove = (index:number) => {
        setTodos(todos => {
            let copy = [...todos]
            copy.splice(index, 1)
            return copy
        })
    }

    const handleItemPriorityChange = (index:number, newItemPriority?:PriorityIndex) => {
        if(!newItemPriority) return
        setTodos(todos => {
            let copy = [...todos]
            copy[index].priority = newItemPriority
            return copy
        })
    }

    useEffect(()=>{
        ToDoStorage.setAllTodos(todos)
    }, [todos])


  return (
    <div className="App">
      <div className='nav'>
        <h1> My Todos </h1>
        <button onClick={toggleTheme}>
          {theme === "dark" ? <MdModeNight /> : <MdSunny/>}
        </button>
      </div>
      <div className="ToDoList">            
        <div>
          {todos.map((todo,i) => (
              <div className="ToDoItem" onClick={()=> handleItemClick(i,todo.isCompleted)}>
                  <div>
                      <input type="checkbox" checked={todo.isCompleted} readOnly/>
                      <span>{todo.title}</span>
                      <PriotityDropDown value={todo.priority} onChange={newPriority => handleItemPriorityChange(i, newPriority)}/>
                  </div>
                  <button className="remove-btn" onClick={e=>{e.stopPropagation();handleItemRemove(i)}}>
                      <RemoveIcon/>
                  </button>
              </div>
          ))}
        </div>
        <form onSubmit={handleAdd}>
            <input name="newItem" placeholder="New Item..."/>
            <PriotityDropDown name="priority" />
            <button type="submit" className="btn primary-btn">Add</button>
        </form>
    </div>
    </div>
  );
}

export default App;
