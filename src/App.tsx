import { FormEventHandler, useEffect, useState } from 'react';
import {MdSunny, MdModeNight, MdMenu as MenuIcon, MdSort, MdRemove, MdCheckBox, MdArrowDropUp, MdArrowDropDown, MdDelete, MdDeleteOutline} from 'react-icons/md'
import { useTheme } from './hooks/useTheme';
import { ToDoStorage } from './ToDoStorage';
import './App.css';
import { OptionButton } from './components/OptionButton/OptionButton';

export type PriorityIndex = 0 | 1 | 2

export type ToDoItemType = {
  isCompleted:boolean,
  title:string,
  priority:0|1|2
}

type FilteredTodoItem = ToDoItemType & {
  originalIndex:number
}

function App() {
  const {theme, toggleTheme} = useTheme()

  const [todos, setTodos] = useState<ToDoItemType[]>(ToDoStorage.getAllTodos())
  const [showCompleted, setShowCompleted] = useState(false)
  const [prioritySort, setPrioritySort] = useState(false)
  const [filteredTodos, setFilteredTodos] = useState<FilteredTodoItem[]>([])

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

  const handleMenuClick = () => {
    let sidemenu = document.getElementById("SideMenu")
    let overlay = document.getElementById("MenuOverlay")
    if(sidemenu && overlay) {
      sidemenu.style.width = "300px"
      overlay.style.display = "block"
    }
  }

  const closeNav = () => {
    let sidemenu = document.getElementById("SideMenu")
    let overlay = document.getElementById("MenuOverlay")
    if(sidemenu && overlay) {
      sidemenu.style.width = "0vw"
      overlay.style.display = "none"
    }
  }

  const updateFilteredTodos = () => {
    let newFilteredTodos = todos.map((todo,i) => {
      return {...todo, originalIndex:i} as FilteredTodoItem
    })
    newFilteredTodos = newFilteredTodos.filter((todo)=>showCompleted || !todo.isCompleted)
    if(prioritySort) {
      newFilteredTodos.sort((a,b)=>b.priority-a.priority)
    }
    setFilteredTodos(newFilteredTodos);
  }

  useEffect(()=>{
    updateFilteredTodos()
  }, [showCompleted, prioritySort])

  useEffect(()=>{
    ToDoStorage.setAllTodos(todos)
    updateFilteredTodos()
  }, [todos])


  return (
    <div className="App">
      <div id='SideMenu'>
        <div>
          <button onClick={closeNav}>
            <MenuIcon/>
          </button>
          <OptionButton Icon={MdSort} text={prioritySort?"Order by Time Added":"Order by Priority"} onClick={e => {setPrioritySort(prioritySort => !prioritySort); closeNav()}}/>
          <OptionButton Icon={theme=="dark" ? MdModeNight : MdSunny} text='Toggle Theme' onClick={e=>{toggleTheme();closeNav()}}/>
          <OptionButton Icon={MdCheckBox} text={`${showCompleted ? 'Hide' : 'Show'} Completed`} onClick={e=>{setShowCompleted(showCompleted => !showCompleted); closeNav()}}/>
        </div>
      </div>
      <div id = 'MenuOverlay' onClick={closeNav}/>
      <div className='nav'>
        <button className='menu-btn' onClick={handleMenuClick}>
          <MenuIcon/>
        </button>
        <h1> My Todos </h1>
      </div>
      <div className='option-bar'>
          <OptionButton Icon={MdSort} text={prioritySort?"Order by Time Added":"Order by Priority"} onClick={e => setPrioritySort(prioritySort => !prioritySort)}/>
          <OptionButton Icon={theme=="dark" ? MdModeNight : MdSunny} text='Toggle Theme' onClick={toggleTheme}/>
          <OptionButton Icon={MdCheckBox} text={`${showCompleted ? 'Hide' : 'Show'} Completed`} onClick={e=> setShowCompleted(showCompleted => !showCompleted)}/>
      </div>
      <form id='new-td' className='card' onSubmit={handleAdd}>  
        <div>
          <input placeholder='New To Do' name='newItem'/><br/>
          <label>Priority: </label>
          <select name="priority">
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </select>
        </div>       
        <button className='primary-btn'>Add</button>
      </form>
      <div className='todo-list'>
        {filteredTodos.map((todo,i) => 
        <div className='todo card horizontal-flex' key={i} onClick={()=> handleItemClick(todo.originalIndex, todo.isCompleted)}>
          <div className='horizontal-flex'>
            <input type="checkbox" checked={todo.isCompleted} readOnly/>
            {todo.priority === 0 && <MdArrowDropDown className='prior low-prior'/>}
            {todo.priority === 1 && <MdRemove className='prior medium-prior'/>}
            {todo.priority === 2 && <MdArrowDropUp className='prior high-prior'/>}
            <span>{todo.title}</span>
          </div>
          <button onClick={e=>{e.stopPropagation();handleItemRemove(todo.originalIndex)}}>
            <MdDeleteOutline />            
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
