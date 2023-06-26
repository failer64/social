import styles from './Login.module.css'
import {login} from "../../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import React from "react";
import {Form, Field, Formik} from "formik";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock, faEnvelope, faRobot} from '@fortawesome/free-solid-svg-icons'
import {StateType} from "../../redux/redux-store";


export const LoginPage = React.memo(() => {
    const isAuth = useSelector((state: StateType) => state.auth.isAuth);
    const userId = useSelector((state: StateType) => state.auth.id);
    const error = useSelector((state: StateType) => state.auth.error);
    const captchaUrl = useSelector((state: StateType) => state.auth.captchaUrl);

    const dispatch = useDispatch<any>();

    if (isAuth) return <Navigate to={`/profile/${userId}`}/>

    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Login into your account</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false,
                    captcha: "",
                }}
                onSubmit={values => {
                    dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
                }}
            >
                <Form className={styles.form}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faEnvelope}/></span>
                        <Field type={'email'} name="email" placeholder="Email"/>
                    </div>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faLock}/></span>
                        <Field type={'password'} name="password" placeholder="Password"/>
                    </div>
                    <div className={styles.checkbox}>
                        <Field type="checkbox" name="rememberMe"/>
                        <span className={styles.label}>Remember me</span>
                    </div>
                    {captchaUrl && <div className={styles.captcha}>
                        <img alt='captcha' src={captchaUrl}/>
                    </div>}
                    {captchaUrl &&
                        <div className={styles.item}>
                            <span><FontAwesomeIcon icon={faRobot}/></span>
                            <Field name="captcha" placeholder="anti-bot"/>
                        </div>
                    }
                    {error && <div className={styles.error}>{error}</div>}
                    <button className={styles.button} type="submit"> Login</button>
                </Form>
            </Formik>
        </div>
    )
});