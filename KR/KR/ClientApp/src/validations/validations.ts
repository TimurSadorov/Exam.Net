import ValidationWithError from "../hook/validation/ValidationWithError";

export const required: ValidationWithError<string> = { 
    valueIsValid: value => value.length > 0,
    errorMessage: "Это поле должно быть заполнено"
}

export const maxLength = function (maxLenght: number): ValidationWithError<string>{
    return {
        valueIsValid: (value: string) => value.length <= maxLenght,
        errorMessage: `Макс. длина ${maxLenght} символов`
    }
}

export const pattern = function (pattern: RegExp, format: string): ValidationWithError<string>{
    return {
        valueIsValid: value => pattern.test(value),
        errorMessage: `Формат: ${format}`
    }
}

export const minValue = function (minValue: number): ValidationWithError<number>{
    return {
        valueIsValid: value => value >= minValue,
        errorMessage: `Минимальное значение ${minValue}`
    }
}

export const maxValue = function (maxValue: number): ValidationWithError<number>{
    return {
        valueIsValid: value => value <= maxValue,
        errorMessage: `Максимальное значение ${maxValue}`
    }
}

export const period = function (startDate?: Date, endDate?: Date): ValidationWithError<string>[]{
    let validations: ValidationWithError<string>[] = [];
    
    if (startDate){
        validations.push({
            valueIsValid: value => startDate <= new Date(Date.parse(value)),
            errorMessage: `Минимальная дата: ${startDate.toLocaleDateString()}`
        });
    }
    
    if (endDate){
        validations.push({
            valueIsValid: value => new Date(Date.parse(value)) <= endDate,
            errorMessage: `Максимальная дата: ${endDate.toLocaleDateString()}`
        });
    }
    
    return validations;
}