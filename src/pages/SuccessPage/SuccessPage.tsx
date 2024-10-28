import {Link} from "react-router-dom";

import style from './SuccessPage.module.css'
import {EPages} from "../../_shared";


export const SuccessPage = () => {
    return (
        <div className={style.container}>
            <h1 className={style.message}>Форма отправлена</h1>
            <Link to={`/${EPages.start}`} className={style.link}>
                Пройти тест еще раз?
            </Link>
        </div>
    );
};
