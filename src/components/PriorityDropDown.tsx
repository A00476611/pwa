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

            <select className="PriorityDropDown" name={name} value={value} onChange={e=>onChange(parseInt(e.target.value) as PriorityIndex)}>
                {priorities.map((priority,i) => <option key={i} value={i}>{priority}</option>)}
            </select>
            :
            <select className="PriorityDropDown" name={name}>
                {priorities.map((priority,i) => <option key={i} value={i}>{priority}</option>)}
            </select>
        }
        </>
        
    )
}