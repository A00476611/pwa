import { ToDoItem, ToDoItemType } from "./ToDoItem"
import { FormEventHandler, useState } from "react"

export const ToDoList = ({initialTodos = []}:{initialTodos?:ToDoItemType[]}) => {
    const [todos, setTodos] = useState(initialTodos)
    const handleAdd:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const newItem = Object.fromEntries(new FormData(e.currentTarget).entries())['newItem']
        if(!newItem) return
        setTodos((todos):ToDoItemType[] => [...todos, {isCompleted:false, title:newItem.toString()}]  )
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

    return (
        <div className="TodoList">
            <h1>My List</h1>
            <form onSubmit={handleAdd}>
                <input name="newItem"/>
                <button type="submit">Add</button>
            </form>
            {todos.map((todo,i) => <ToDoItem key={i} todo={todo} onClick={(current)=>handleItemClick(i, current)} onRemove={()=>handleItemRemove(i)}/>)}
        </div>
    )
}