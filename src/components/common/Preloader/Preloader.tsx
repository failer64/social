// @ts-ignore
import preloader from "./../../../assets/img/loading.gif";
import React from "react";
import styles from './Preloader.module.css'

let Preloader = () => {
    return (<div className={styles.body}>
        <div className={styles.icon}>
            <img src={preloader} alt="icon"/>
        </div>
    </div>)
}

export default Preloader;