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
        <div>
            <div onClick={()=>onClick(todo.isCompleted)}>
                <input type="checkbox" checked={todo.isCompleted} readOnly/>
                <span>{todo.title}</span>
            </div>
            <button onClick={onRemove}>Remove</button>
        </div>
    )
}