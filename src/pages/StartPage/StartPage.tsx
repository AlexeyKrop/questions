import {FC} from 'react';
import {Link} from 'react-router-dom';

import style from './StartPage.module.css'


interface IStartPageProps {
    enableTimer?: boolean;
}

export const StartPage: FC<IStartPageProps> = (props) => {
    const {enableTimer} = props;
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
            {enableTimer &&
                <p className={style.warning}>
                    После начала тестирования таймер запустится автоматически.
                    При истечении времени ваши ответы будут сохранены автоматически.
                </p>
            }
        </div>
    );
};
