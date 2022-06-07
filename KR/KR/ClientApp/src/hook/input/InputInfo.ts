import {ChangeEvent, Dispatch, FocusEvent} from "react";
import ValidationState from "../validation/ValidationState";

export default interface InputInfo<TInput>{
    value: TInput;
    onChange: (e: ChangeEvent<Node>) => void;
    onBlur: (e: FocusEvent<Node>) => void;
    resetInput: () => void;
    isDirty: boolean;
    validationState: ValidationState;
    setValue: (value: TInput) => void;
}