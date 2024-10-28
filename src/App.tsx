import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {FormLayout} from "./layouts";
import {EPages, generateForm} from "./_shared";
import {FormPage, StartPage, SuccessPage} from "./pages";

function App() {
    const {pages, globalTimer} = generateForm();
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<FormLayout/>}>
                    <Route path={EPages.start} element={<StartPage enableTimer={globalTimer?.enabled}/>}/>
                    <Route path={`${EPages.form}/:pageId`} element={<FormPage/>}/>
                    <Route path={`${EPages.form}/${EPages.success}`} element={<SuccessPage/>}/>
                    <Route
                        path="*"
                        element={<Navigate to={`${EPages.form}/${pages[0].id}`} replace/>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
