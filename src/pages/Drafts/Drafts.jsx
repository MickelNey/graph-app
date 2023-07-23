import styles from './Clusterboards.module.css'
import {useNavigate} from "react-router-dom"
import {useDraftsByUser } from '../../entities'
import graphLogo from '/image.jpg'
import userLogo from '../../shared/static/icons/user.svg'
import {HeaderLayout} from '../../widgets'

export const Drafts = () => {
    const {drafts, isLoading}= useDraftsByUser()
    const navigate = useNavigate()

    return <div className={styles.container}>
        <HeaderLayout>
            <div className={styles.header_languageItem}>RU</div>
            <div className={styles.header_titleItem}>Кластерборды</div>
            <div className={styles.header_userItem}>
                <img src={userLogo}/>
            </div>
        </HeaderLayout>

        {!isLoading 
            ? <main className={styles.main}>
                {drafts.data && drafts.data.map((draft, index) => 
                (<div key={index} className={styles.main_item} onClick={() => navigate(`/draft/${draft.id}`)}>
                    <div className={styles.image}>
                        <img className={styles.image_item} src={graphLogo} />
                    </div>
                    <div>
                        {draft.name}
                    </div>
                </div>))}
                
                <div className={styles.main_itemtwo} onClick={() => navigate('/create')}>Создать Кластерборд</div>                
            </main>
            : <div>loading...</div>
        }
    </div>
}