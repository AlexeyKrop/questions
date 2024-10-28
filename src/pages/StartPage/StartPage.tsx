import {Link} from 'react-router-dom';
import {generateForm} from "../../_shared";

import style from './StartPage.module.css'


export const StartPage = () => {
    const {globalTimer} = generateForm();
    return (
        <div className={style.container}>
            <h1 className={style.title}>Добро пожаловать на тестирование</h1>
            <p className={style.description}>
                Перед вами тест для оценки ваших знаний. На выполнение теста отведено ограниченное время.
                Пожалуйста, убедитесь, что вы готовы начать и вас ничто не будет отвлекать.
            </p>
            <Link to="/test/1" className={style.button}>
                Начать тестирование
            </Link>
            {globalTimer?.enabled &&
                <p className={style.warning}>
                    После начала тестирования таймер запустится автоматически.
                </p>
            }
        </div>
    );
};
