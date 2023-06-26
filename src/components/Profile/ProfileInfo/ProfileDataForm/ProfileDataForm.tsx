import {Field, Form, Formik} from "formik";
import styles from './ProfileDataForm.module.css'
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {profileErrorsSelector} from "../../../../redux/selectors/profile-selectors";
import {InfoType, ProfileType} from "../../../../types/types";

export const ProfileDataForm: FC<PropsType> = ({userProfile, onSubmit}) => {

    const error = useSelector(profileErrorsSelector);

    return (<Formik
            initialValues={{
                userId: userProfile.userId,
                fullName: userProfile.fullName,
                lookingForAJob: userProfile.lookingForAJob,
                lookingForAJobDescription: userProfile.lookingForAJobDescription,
                aboutMe: userProfile.aboutMe,
                contacts: userProfile.contacts
            }}
            onSubmit={(values: InfoType) => {
                onSubmit(values);
            }}
        >
            <Form className={styles.body}>
                <div className={styles.item}>
                    <label className={styles.label}>Full Name</label>
                    <Field className={styles.input} name='fullName' placeholder="full Name"/>
                </div>
                <div className={styles.checkbox}>
                    <Field name='lookingForAJob' type={'checkbox'}/>
                    <label className={styles.label}>Looking for a job</label>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>My work skills</label>
                    <Field className={styles.input} name='lookingForAJobDescription' placeholder="My work skills"/>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>About</label>
                    <Field className={styles.input} name='aboutMe' placeholder="About Me"/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Contacts</label>
                    {Object.keys(userProfile.contacts).map(keyName => (
                        <div key={keyName} className={styles.contactItem}>
                            <label className={styles.label}>{keyName}</label>
                            <Field className={styles.input} name={'contacts.' + keyName}/>
                        </div>
                    ))}
                </div>
                <div>
                    <button type={"submit"} className={styles.button}>Edit</button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
            </Form>
        </Formik>
    )
}

type PropsType = {
    userProfile: ProfileType
    onSubmit: (values: any) => void
}