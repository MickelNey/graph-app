import React from 'react'
import styles from './Modal.module.css'

export const Modal = ({ 
    active, 
    setActive, 
    children, 
    clearFunc = () => { return 0 }
}) => {
    return (
        <div className={`${active ? styles.modal_active : ''} ${styles.modal}`} 
            onClick={() => {
            setActive(false)
            clearFunc()
        }}>

            <form className={styles.container} onClick={(e) => e.stopPropagation()}>
                {children}
            </form>

        </div>
    )
}