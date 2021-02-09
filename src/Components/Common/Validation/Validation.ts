


export type FieldValidatorRequired = (value: string) => string | undefined


export const required: FieldValidatorRequired = (value) => {
    if (value) return undefined;

    return 'Field is required!';
}

// export const maxlengthCreator = (maxlength) => (value) => {
//     if (value.length > maxlength) return `Max length is ${maxlength} symbols`;

//     return undefined;
// }