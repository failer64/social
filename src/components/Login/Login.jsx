import styles from './Login.module.css'
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import React from "react";
import {Form, Field, Formik} from "formik";

const LoginForm = (props) => {
    if (props.isAuth) return <Navigate to={`/profile/${props.userId}`}/>
    return (
        <div>
            <h1 className={styles.title}>Login</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false,
                }}
                onSubmit={values => {
                    props.login(values.email, values.password, values.rememberMe);
                }}
            >
                <Form className={styles.body}>
                    <div className={styles.item}>
                        <Field type={'email'} name="email" placeholder="Email"/>
                    </div>
                    <div className={styles.item}>
                        <Field type={'password'} name="password" placeholder="Password"/>
                    </div>
                    <div className={styles.checkbox}>
                        <Field type="checkbox" name="rememberMe"/>
                        <span className={styles.label}>rememberMe</span>
                    </div>
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
    }
)

export default connect(mapStateToProps, {login})(LoginForm);