import styles from './HeaderLayout.module.css'


export const HeaderLayout = ({children}) => {
    return <>
        <header className={styles.header}>
            <div className={styles.header_container}>
                {children}
            </div>
        </header>
        <div className={styles.divider}></div>
    </>
}

