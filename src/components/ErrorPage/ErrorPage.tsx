import style from './ErrorPage.module.css'
import img from './../../assets/img/404.png'

export const ErrorPage = () => {
    return (
        <div className={style.body}>
            <div className={style.image}>
                <img src={img} alt="404"/>
            </div>
            <h2 className={style.title}>Whoops, looks like something went wrong</h2>
            <div className={style.text}>Page not found</div>
        </div>
    )
}