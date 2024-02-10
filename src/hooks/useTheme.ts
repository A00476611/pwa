import { useState, useEffect } from "react"

export const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    const toggleTheme = () => {
        setTheme(theme => theme === "dark" ? "light" : "dark")    
    }

    useEffect(()=>{
        if(theme){
            document.querySelector("body")?.setAttribute("theme", theme)
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#222228" :"#0075ff")
            localStorage.setItem("theme", theme)
        }
    }, [theme])

    return {theme, toggleTheme}
}