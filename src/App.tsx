import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {FormLayout} from "./layouts";
import {EPages} from "./_shared";
import {FormPage, StartPage, SuccessPage} from "./pages";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<FormLayout/>}>
                    <Route path={EPages.start} element={<StartPage/>}/>
                    <Route path={`${EPages.form}/:pageId`} element={<FormPage/>}/>
                    <Route path={`${EPages.form}/${EPages.success}`} element={<SuccessPage/>}/>
                    <Route
                        path="*"
                        element={<Navigate to={EPages.start} replace/>}
                    />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App

