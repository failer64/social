import styles from './Login.module.css'
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import React from "react";
import {Form, Field, Formik} from "formik";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock, faEnvelope,faRobot} from '@fortawesome/free-solid-svg-icons'

const LoginForm = (props) => {
    if (props.isAuth) return <Navigate to={`/profile/${props.userId}`}/>
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Login into your account</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false,
                    captcha : "",
                }}
                onSubmit={values => {
                    props.login(values.email, values.password, values.rememberMe, values.captcha);
                }}
            >
                <Form className={styles.form}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faEnvelope} /></span>
                        <Field type={'email'} name="email" placeholder="Email"/>
                    </div>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faLock} /></span>
                        <Field type={'password'} name="password" placeholder="Password"/>
                    </div>
                    <div className={styles.checkbox}>
                        <Field type="checkbox" name="rememberMe"/>
                        <span className={styles.label}>Remember me</span>
                    </div>
                    {props.captchaUrl && <div className={styles.captcha}>
                        <img alt={'captcha'} src={props.captchaUrl}/>
                    </div>}
                    {props.captchaUrl &&
                        <div className={styles.item}>
                            <span><FontAwesomeIcon icon={faRobot} /></span>
                            <Field name="captcha" placeholder="anti-bot"/>
                        </div>
                    }
                    {props.error ? <div className={styles.error}>{props.error}</div> : null}
                    <button className={styles.button} type="submit"> Login</button>
                </Form>
            </Formik>
        </div>
    )
};


const mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
        userId: state.auth.id,
        error: state.auth.error,
        captchaUrl: state.auth.captchaUrl,
    }
)

export default connect(mapStateToProps, {login})(LoginForm);