import { MdRemove as RemoveIcon } from "react-icons/md"

export type ToDoItemType = {
    isCompleted:boolean,
    title:string
}

export type ToDoItemProps = {
    todo:ToDoItemType,
    onClick:(current:boolean)=>void,
    onRemove:()=>void
}

export const ToDoItem = ({todo, onClick, onRemove}:ToDoItemProps) => {
    return (
        <div className="ToDoItem" onClick={()=> onClick(todo.isCompleted)}>
            <div>
                <input type="checkbox" checked={todo.isCompleted} readOnly/>
                <span>{todo.title}</span>
            </div>
            <button className="remove-btn" onClick={e=>{e.stopPropagation();onRemove()}}>
                <RemoveIcon/>
            </button>
        </div>
    )
}