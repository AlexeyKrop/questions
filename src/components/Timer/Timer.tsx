import {FC, useEffect, useState} from "react";

import style from './Timer.module.css'

interface ITimerProps {
    initialTime: number;
    onTimeEnd: () => void;
}

export const TIMER_KEY = "timerEndTime";

export const Timer: FC<ITimerProps> = (props) => {
    const {initialTime, onTimeEnd} = props;
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedEndTime = localStorage.getItem(TIMER_KEY);

        if (savedEndTime) {
            const remaining = Math.max(0, Math.floor((parseInt(savedEndTime) - Date.now()) / 1000));
            return remaining || initialTime;
        }
        return initialTime;
    });

    const handleTimeEnd = () => {
        localStorage.removeItem(TIMER_KEY);
        if (onTimeEnd) {
            setTimeout(onTimeEnd, 0);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem(TIMER_KEY)) {
            const endTime = Date.now() + timeLeft * 1000;
            localStorage.setItem(TIMER_KEY, endTime.toString());
        }

        let timer: ReturnType<typeof setInterval>;

        if (timeLeft <= 0) {
            handleTimeEnd();
        } else {
            timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        handleTimeEnd();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timeLeft]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={style.timer}>
            {formatTime(timeLeft)}
        </div>
    );
};

