import { LoginModal, RegistrationModal } from "../../feautures"
import styles from './Start.module.css'
import image from '../../shared/static/images/main.png'

export const Start = () => {
    return <div className={styles.container}>
        <div className={styles.image}>
            <img src={image}/>
        </div>
        <div className={styles.button}>
            <LoginModal />
        </div>
        <div className={styles.button}>
            <RegistrationModal title='Зарегистрироваться'/>
        </div>
    </div>
}