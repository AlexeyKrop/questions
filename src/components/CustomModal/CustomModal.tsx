import {FC} from "react";
import {IconCalendarTime} from '@tabler/icons-react';


import style from './CustomModal.module.css'

interface ICustomModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CustomModal: FC<ICustomModalProps> = (props) => {
    const {isOpen, onClose} = props;
    if (!isOpen) return null;

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={e => e.stopPropagation()}>
                <div className={style.header}>
                    <div className={style.icon}>
                        <IconCalendarTime size={24} stroke={1.5}/>
                    </div>
                    <h2 className={style.title}>Время теста истекло</h2>
                </div>
                <div className={style.content}>
                    К сожалению, отведенное время на выполнение теста закончилось.
                    Пожалуйста, попробуйте заново через несколько часов.
                </div>
                <button className={style.button} onClick={onClose}>
                    Понятно
                </button>
            </div>
        </div>
    );
};