import { ToDoItemType } from "./";

export const ToDoStorage = {
    getAll:():ToDoItemType[] | [] => {
        let storageString = localStorage.getItem("todos")
        if(!storageString) return []
        return JSON.parse(storageString) as ToDoItemType[]
    },

    setAll:(todos:ToDoItemType[]) => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }
}