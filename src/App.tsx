import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {initApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import React, {useEffect} from "react";
import {LoginPage} from "./components/Login/Login";
import {StateType} from "./redux/redux-store";
import {Header} from "./components/Header/Header";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";
import {ProfilePage} from "./components/Profile/ProfilePage";
import {Chat} from "./components/Chat/Chat";


const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));
const MessengerPage = React.lazy(() => import('./components/Messenger/Messenger'));

export const App = () => {
    const init = useSelector((state: StateType) => state.app.init);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(initApp());
    }, []);

    if (!init) {
        return <Preloader/>
    }
    return (
        <div className='wrapper'>
            <Header/>
            <main className='main'>
                <Sidebar/>
                <section className='content'>
                    <div className='container'>
                        <React.Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path="/" element={<Navigate to={'/login'} replace/>}/>
                                <Route path="/profile" element={<ProfilePage/>}/>
                                <Route path="/profile/:userId" element={<ProfilePage/>}/>
                                <Route path="/dialogs" element={<Dialogs/>}/>
                                <Route path="/dialogs/:userId" element={<Chat/>}/>
                                <Route path="/users" element={<UsersPage/>}/>
                                <Route path="/messenger" element={<MessengerPage/>}/>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/*" element={<ErrorPage/>}/>
                            </Routes>
                        </React.Suspense>
                    </div>
                </section>
            </main>
        </div>
    )
}