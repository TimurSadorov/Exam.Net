import {Dispatch, MutableRefObject} from "react";

export default interface FormInfo<TForm> {
    form: MutableRefObject<TForm>;
    resetValueToInitial: () => void;
    formIsReset: boolean;
    checkOnValid: () => void;
    setIsValid: Dispatch<boolean>;
    isValid: boolean;
    validationCheck: boolean;
}
