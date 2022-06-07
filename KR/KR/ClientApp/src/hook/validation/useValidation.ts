import {useEffect, useState} from "react";
import ValidationState from "./ValidationState";
import ValidationWithError from "./ValidationWithError";


export function useValidation<TValue>(value: TValue, validations?: ValidationWithError<TValue>[]): ValidationState{
    const [errorMessage, setErrorMessage] = useState("");
    const [inputIsValid, setInputIsValid] = useState(false);
    
    useEffect(() => {
        let inputIsValid = true;
        let errorMessage = "";
        if (validations){
            validations.forEach(predicate => {
                let isValid = predicate.valueIsValid(value);
                
                if (!isValid){
                    errorMessage = predicate.errorMessage ?? "";
                }
                inputIsValid = inputIsValid && isValid;
            })
        }
        
        setErrorMessage(errorMessage);
        setInputIsValid(inputIsValid);
    }, [value]);
    
    return {
        inputIsValid,
        errorMessage
    }
}