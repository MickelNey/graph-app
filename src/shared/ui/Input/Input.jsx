import React from "react";
import styles from "./Input.module.css";

export const Input = ({
    title = 'form',
    isTitle = true,
    valid = false,
    star = true,
    ...props }) => {
    return (
        <div className={props.className}>
            {isTitle && <div className={`${styles.title} ${star ? styles.title_star : ''}`}>{title}</div>}

            <div className={`${styles.input_container} ${valid ? styles.valid : styles.noValid}`}>
            <input {...props}
                className={`${styles.input}`}
            />
            </div>
        </div>
    );
};