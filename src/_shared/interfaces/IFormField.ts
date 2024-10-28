export enum EFormFieldType {
    checkbox = 'checkbox',
    radio = 'radio',
    input = 'input',
    textarea = 'textarea',
}

export interface IFormFieldsStateData {
    [id: string]: TFormFieldValue;
}

type TPrimitiveValue = string | number | boolean;
export type TFormFieldValue = TPrimitiveValue | Array<TPrimitiveValue>;

interface IFormRadioItem {
    id: string;
    content: string;
}

interface IFormCheckboxItem {
    id: string;
    content: string;
}

export interface ITimerConfig {
    enabled: boolean;
    timeMS?: number;
}

export interface IPagesForm {
    pages: IForm[];
    globalTimer?: ITimerConfig;
}

export interface IForm {
    id: string;
    title: string;
    fields: IFormField[];
    description?: string;
    navigationLabel?: string;
}

export interface IFormField {
    id: string;
    type: EFormFieldType;
    required?: boolean;
    radioParams?: {
        items: IFormRadioItem[],
    },
    checkboxParams?: {
        items: IFormCheckboxItem[],
    },
    isMultiValue?: boolean;
}

export type TFieldTypeToElement = {
    [EFormFieldType.input]: HTMLInputElement;
    [EFormFieldType.textarea]: HTMLTextAreaElement;
    [EFormFieldType.radio]: HTMLInputElement;
    [EFormFieldType.checkbox]: HTMLInputElement;
}

export type TFormData = { [key: string]: TFormFieldValue }