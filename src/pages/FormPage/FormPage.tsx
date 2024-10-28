import {Fragment, useState} from "react";
import {Button} from '@mantine/core';
import {useNavigate, useParams} from "react-router";
import {
    ENavigationDirection, EPages,
    generateForm,
    IFormField, useFormValidation,
    useFormWithPersistence,
    useNavigationSteps
} from "../../_shared";
import {createNavigationSteps, CustomModal, FormField, NavigationSteps, Timer, TIMER_KEY} from "../../components";

import style from './FormPage.module.css'

enum EFormPagePopup {
    timerExpiredNotification
}

type TActivePopup = EFormPagePopup | null;

export const FormPage = () => {
    const [activePopup, setActivePopup] = useState<TActivePopup | null>(null);
    const navigate = useNavigate();
    const {pages, globalTimer} = generateForm();
    const {pageId} = useParams<{ pageId: string }>()
    const {
        active,
        isFirstPage,
        isLastPage,
        currentPage,
        handleNavigation,
    } = useNavigationSteps(pages);

    const {
        formData,
        handleFieldChange,
        submitForm,
        clearFormData,
    } = useFormWithPersistence('formData');

    const onNavigate = async (direction: ENavigationDirection) => {
        handleNavigation(direction);
        if (isLastPage && direction !== ENavigationDirection.prev) {
            await submitForm()
            localStorage.removeItem(TIMER_KEY)
        }
    };

    const {isValid} = useFormValidation(pages, formData, pageId);

    const changeActivePopup = (action: TActivePopup) => () => {
        setActivePopup(action);
    }

    const handleTimerExpired = () => {
        changeActivePopup(EFormPagePopup.timerExpiredNotification);
        clearFormData();
        navigate(`/${EPages.start}`);
    };

    return (
        <>
            <div className={style.header}>
                <h4>Тестирование</h4>
                {globalTimer?.enabled && (
                    <Timer
                        initialTime={globalTimer.timeSec ?? 0}
                        onTimeEnd={changeActivePopup(EFormPagePopup.timerExpiredNotification)}
                    />
                )}
            </div>
            <NavigationSteps
                steps={createNavigationSteps(pages)}
                activeStep={active}
            />
            <div className={style.form}>
                <div className={style.form_title}>{currentPage?.title}</div>
                <div className={style.form_content}>
                    {currentPage?.fields.map((field: IFormField) => (
                        <Fragment key={field.id}>
                            <FormField
                                field={field}
                                onFieldChange={handleFieldChange}
                                data={formData}
                                classNames={{
                                    input: style.input,
                                    textarea: style.textarea,
                                    checkbox: style.checkbox,
                                    radio: style.radio,
                                }}
                            />
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className={style.form_action}>
                <Button disabled={isFirstPage} variant="default"
                        onClick={() => onNavigate(ENavigationDirection.prev)}>Назад</Button>
                <Button
                    disabled={!isValid}
                    onClick={() => onNavigate(ENavigationDirection.next)}
                >
                    {isLastPage ? 'Отправить' : 'Далее'}
                </Button>
            </div>
            <CustomModal
                isOpen={activePopup === EFormPagePopup.timerExpiredNotification}
                onClose={handleTimerExpired}
            />
        </>
    );
};
