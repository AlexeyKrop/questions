import {ChangeEvent, FC, ReactElement} from "react";
import {Checkbox, Radio, Textarea, TextInput} from "@mantine/core";
import {
    EFormFieldType,
    IFormField,
    IFormFieldsStateData,
    TFieldTypeToElement,
    TFormFieldValue
} from "../../_shared";
import {getFieldValue} from "./helpers";

import style from './FormField.module.css'


interface IFormFieldProps {
    field: IFormField;
    data?: IFormFieldsStateData | null;
    onFieldChange?: (fieldId: string, value: TFormFieldValue) => void;
}

export const FormField: FC<IFormFieldProps> = (props) => {
    const {field, data, onFieldChange} = props;
    const {type, radioParams, id, checkboxParams, isMultiValue, required} = field;

    const value = getFieldValue(id, data);
    const renderRequiredLabel = () => required ? <span className={style.required}> Обязательное поле <span className={style.required_asterisk}>*</span></span> : null;

    const changeFieldValueHandler = <T extends keyof TFieldTypeToElement>(
        event: ChangeEvent<TFieldTypeToElement[T]>
    ): void => {
        const {target} = event;
        let newValue: TFormFieldValue;

        if (isMultiValue) {
            const itemValue = target.value;
            const currentValue = Array.isArray(value) ? value : [];
            newValue = currentValue.includes(itemValue)
                ? currentValue.filter(item => item !== itemValue)
                : [...currentValue, itemValue];
        } else {
            newValue = target.value;
        }

        onFieldChange?.(id, newValue);
    };

    let fieldRender: ReactElement | null = null;

    switch (type) {
        case EFormFieldType.input:
            const inputValue = typeof value === 'string' || typeof value === 'number' ? value : '';
            const inputProps = {
                value: inputValue,
                onChange: changeFieldValueHandler<EFormFieldType.input>,
            }
            fieldRender = (
                <>
                    {renderRequiredLabel()}
                    <TextInput
                        {...inputProps}
                    />
                </>
            );
            break;

        case EFormFieldType.radio:
            const radioItems = radioParams?.items || [];
            fieldRender = (
                <>
                    {renderRequiredLabel()}
                    {radioItems.map((radio) => {
                        const {id, content} = radio;
                        const radioProps = {
                            value: content,
                            label: content,
                            onChange: changeFieldValueHandler<EFormFieldType.radio>,
                            name: id,
                            checked: Array.isArray(value) ? value.includes(content) : value === content,
                        }
                        return (
                            <Radio key={id} {...radioProps}/>
                        );
                    })}
                </>
            );
            break;
        case EFormFieldType.checkbox:
            const checkboxItems = checkboxParams?.items || [];
            fieldRender = (
                <>
                    {renderRequiredLabel()}
                    {checkboxItems.map((checkbox) => {
                        const {id, content} = checkbox;
                        const checkboxProps = {
                            value: content,
                            label: content,
                            name: id,
                            checked: Array.isArray(value) ? value.includes(content) : value === content,
                            onChange: changeFieldValueHandler<EFormFieldType.checkbox>,
                        }
                        return (
                            <Checkbox key={id} {...checkboxProps}/>
                        );
                    })}
                </>
            );
            break;

        case EFormFieldType.textarea:
            const textareaValue = typeof value === 'string' ? value : '';
            const textareaProps = {
                value: textareaValue,
                onChange: changeFieldValueHandler<EFormFieldType.textarea>,
                autosize: true,
                minRows: 5,
            }
            fieldRender = (
                <>
                    {renderRequiredLabel()}
                    <Textarea
                        {...textareaProps}
                    />
                </>
            );
            break;
    }

    return (
        fieldRender
    );
};

