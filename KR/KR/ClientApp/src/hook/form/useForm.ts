import {useRef, useState} from "react";
import FormInfo from "./FormInfo";

export default function useForm<TValue>(initialValue: TValue): FormInfo<TValue>{
    const form = useRef(initialValue);
    const [formIsReset, setFormIsReset] = useState(false);
    const [validationCheck, setValidationCheck] = useState(false);
    const [isValid, setIsValid] = useState(false);
    
    function resetValueToInitial(){
        form.current = initialValue;
        setFormIsReset(true);
    }
    
    function checkOnValid(){
        setIsValid(true);
        setValidationCheck(!validationCheck);
    }
    
    return {
        form,
        resetValueToInitial,
        formIsReset,
        checkOnValid,
        setIsValid,
        isValid,
        validationCheck
    }
}