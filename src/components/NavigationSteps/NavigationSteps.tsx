import {FC} from 'react';
import {Tooltip} from '@mantine/core';
import cn from 'classnames';

import style from './NavigationSteps.module.css';


export interface INavigationStep {
    id: string;
    label?: string;
}

interface INavigationStepsProps {
    steps: INavigationStep[];
    activeStep: number;
    className?: string;
}

export const NavigationSteps: FC<INavigationStepsProps> = (props) => {
    const {activeStep, steps, className} = props;
    const stepsClasses = cn(
        style.navigation,
        className
    )
    return (
        <div className={stepsClasses}>
            {steps.map((step, index) => {
                const {label, id} = step;
                return (
                    <Tooltip label={label} key={id}>
                        <div
                            className={cn(style.step, {
                                [style.completed]: index < activeStep,
                                [style.current]: index === activeStep,
                            })}
                        >
                        </div>
                    </Tooltip>
                )
            })}
        </div>
    );
}