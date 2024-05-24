import React from "react";
import {InputFieldsProps} from "../types/PagesTypes"
const inputStyle = ` 
    w-full
    md:w-[325px]  
    lg:w-[388px]  
    xl:w-[388px]
    px-4 
    py-3 
    mt-3 
    my-1
    border-lightShade2   
    outline-bluerega   
    rounded-md  
    border   
    focus:border-lightShade2 
    bg-white
    `;

const InputFields = (props: InputFieldsProps) => {
    const {ref, onChange, value, name} = props;
    return (
        <input
            ref={ref}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={""}
            className={inputStyle}
        />
    )
}

export default InputFields;