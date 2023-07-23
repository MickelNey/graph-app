import userLogo from '../../shared/static/icons/user.svg'
import arrow from '../../shared/static/icons/vector.svg'
import styles from './Header.module.css'
import {useNavigate} from "react-router-dom"
import { HeaderLayout } from '../HeaderLayout/HeaderLayout'

export const Header = ({title}) => {
    const navigate = useNavigate()

    return (
        <HeaderLayout>  
            <div className={styles.header_languageItem} onClick={() => navigate('/')}>
                <img src={arrow}/>
            </div>
            <div className={styles.header_titleItem}>{title}
            </div>
            <div className={styles.header_userItem}>
                <img src={userLogo}/>
            </div>
        </HeaderLayout>
    )
}

