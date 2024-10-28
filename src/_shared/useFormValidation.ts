import {useMemo} from "react";
import {IForm, TFormData} from "./interfaces/IFormField";

interface IMissingField {
    pageId: string;
    fieldId: string;
    title: string;
}

export const useFormValidation = (pages: IForm[], formData: TFormData | null, pageId?: string) => {
    const {isValid, missingFields} = useMemo(() => {
        const missingRequiredFields = pages.reduce<IMissingField[]>((acc, page) => {
            page.fields.forEach(field => {
                if (field.required && isFieldEmpty(formData?.[field.id])) {
                    acc.push({
                        pageId: page.id,
                        fieldId: field.id,
                        title: page.title
                    });
                }
            });
            return acc;
        }, []);

        const isValid = !missingRequiredFields.some(item => item.pageId === pageId);

        return {isValid, missingFields: missingRequiredFields};
    }, [pages, formData, pageId]);

    return {isValid, missingFields};
};

const isFieldEmpty = (value: unknown): boolean =>
    value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
