import {FocusEvent, useState} from "react";
import InputInfo from "./InputInfo";
import {useValidation} from "../validation/useValidation";
import ValidationWithError from "../validation/ValidationWithError";

export function useInput<TInput>(defaultValue: TInput, validations?: ValidationWithError<TInput>[]): InputInfo<TInput>{
    const [value, setValue] = useState<TInput>(defaultValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations);
    
    function onChange(e: any): void {
        console.dir(e);
        setValue(e.target.value);
    }
    
    function onBlur(e: FocusEvent<Node>): void {
        setIsDirty(true);
    }
    
    function resetInput(){
        setIsDirty(false);
        setValue(defaultValue);
    }
    
    return {
        value,
        onChange,
        onBlur,
        resetInput,
        setValue,
        isDirty,
        validationState: valid
    }
}