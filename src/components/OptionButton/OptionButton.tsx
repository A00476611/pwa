import { IconType } from "react-icons"
import './styles.css'
import { MouseEventHandler } from "react"

export type OptionButtonProps = {
    Icon:IconType,
    text:string,
    onClick?:MouseEventHandler
}

export const OptionButton = ({Icon, text, onClick=()=>{} }:OptionButtonProps) => {
    return (
        <button className="option-btn" onClick={onClick}>
            <Icon/>
            {text}
        </button>
    )
}