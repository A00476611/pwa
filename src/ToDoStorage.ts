import { ToDoItemType } from "./App";

export const ToDoStorage = {
    getAllTodos:():ToDoItemType[] | [] => {
        let storageString = localStorage.getItem("todos")
        if(!storageString) return []
        return JSON.parse(storageString) as ToDoItemType[]
    },

    setAllTodos:(todos:ToDoItemType[]) => {
        localStorage.setItem("todos", JSON.stringify(todos))
    },
}