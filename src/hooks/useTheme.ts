import { useState, useEffect } from "react"

export const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    const toggleTheme = () => {
        setTheme(theme => theme === "dark" ? "light" : "dark")    
    }

    useEffect(()=>{
        if(theme){
            document.querySelector("body")?.setAttribute("theme", theme)
            localStorage.setItem("theme", theme)
        }
    }, [theme])

    return {theme, toggleTheme}
}