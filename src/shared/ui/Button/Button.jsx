import React from "react";
import styles from './Button.module.css';


export const Button = ({ children, disabled, ...props } ) => {
    return (
        <div className={props.className}>
                <button {...props} disabled={disabled}
                    className={`${styles.button} ${disabled ? styles.button_disabled: ''}`}>
                    {children ? children : 'Continue'}
                </button>
        </div>
    )
}