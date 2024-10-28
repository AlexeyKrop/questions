import { IFormFieldsStateData, TFormFieldValue } from "../../../_shared";


export const getFieldValue = (id: string, data?: IFormFieldsStateData | null): TFormFieldValue | undefined => {
    return data?.[id];
}