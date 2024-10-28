import {Outlet} from "react-router";

import style from './FormLayout.module.css'


export const FormLayout = () => {
    return (
        <div className={style.form_layout}>
            <Outlet/>
        </div>
    )
}