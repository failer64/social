import React, {FC} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {actions, FilterType, getUsers} from "../../redux/users-reducer";
import style from './SearchForm.module.css'

export const SearchForm: FC<PropsType> = ({pageSize, filter}) => {
    const dispatch = useDispatch<any>();

    const submit = (values: ValuesType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const newFilter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        dispatch(getUsers(1, pageSize, newFilter));
        dispatch(actions.setCurrentPage(1));
        setSubmitting(false);
    }

    const initialValues: ValuesType = {
        term: filter.term,
        friend: filter.friend === null ? 'null' : filter.friend === true ? 'true' : 'false'
    };

    return <div className={style.body}>
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field className={style.input} type="text" name="term" placeholder={"Enter Name"}/>
                    <Field className={style.select} name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Not Followed</option>
                    </Field>
                    <button className={style.button} type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

type PropsType = {
    pageSize: number
    filter: FilterType
}

type ValuesType = {
    term: string
    friend: string
}
