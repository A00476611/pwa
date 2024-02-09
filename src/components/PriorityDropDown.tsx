import { PriorityIndex } from "../App"

export const priorities = [
    "High",
    "Medium",
    "Low"
]

export type PriotityDropDownProps = {
    name?:string,
    value?:PriorityIndex,
    onChange?: (arg0?:PriorityIndex) => void,
}

export const PriotityDropDown = ({name, value, onChange}:PriotityDropDownProps) => {
    return (
        
        <>
        {
            onChange != undefined ? 

            <select name={name} value={value} onChange={e=>onChange(parseInt(e.target.value) as PriorityIndex)}>
                {priorities.map((priority,i) => <option value={priority}>{priorities[i]}</option>)}
            </select>
            :
            <select name={name}>
                {priorities.map((priority,i) => <option value={priority}>{priorities[i]}</option>)}
            </select>
        }
        </>
        
    )
}