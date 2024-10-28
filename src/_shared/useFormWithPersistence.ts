import {useCallback, useEffect, useState} from "react";
import superjson from "superjson";
import {EPages, TFormData, TFormFieldValue} from ".";
import {useNavigate} from "react-router";

interface IUseFormWithPersistenceReturn {
    formData: TFormData | null;
    handleFieldChange: (id: string, value: TFormFieldValue) => void;
    submitForm: () => Promise<void>;
    clearFormData: () => void;
}

export const useFormWithPersistence = (storageKey: string): IUseFormWithPersistenceReturn => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TFormData | null>(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? superjson.parse(saved) : null;
        } catch (e) {
            throw new Error(`Не удалось восстановить данные формы из локального хранилища: ${e}`);
        }
    });

    const persistFormData = () => {
        try {
            if (formData) {
                localStorage.setItem(storageKey, superjson.stringify(formData));
            } else {
                localStorage.removeItem(storageKey);
            }
        } catch (e) {
            throw new Error(`Не удалось сохранить данные формы в локальное хранилище: ${e}`);
        }
    };

    const handleFieldChange = useCallback((id: string, value: TFormFieldValue): void => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    }, []);

    const clearFormData = () => {
        setFormData(null);
        localStorage.removeItem(storageKey);
    };

    const submitForm = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        clearFormData();
        navigate(`/${EPages.form}/${EPages.success}`, {replace: true});
    };

    useEffect(() => {
        persistFormData()
    }, [formData])

    return {
        formData,
        handleFieldChange,
        submitForm,
        clearFormData
    };
};