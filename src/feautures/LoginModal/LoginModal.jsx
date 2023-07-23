import React, {useState} from 'react'
import {Button, Modal, Input} from "../../shared"
import {useLogin} from "../../entities/Auth/useAuthContext"
import styles from './LoginModal.module.css'

export const LoginModal = ({ title = 'Войти'}) => {
    const [loginActive, setLoginActive] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loginAsync, isLoading, isError } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await loginAsync({
            email: email,
            password: password
        })
        setLoginActive(false)
    }

    return (
        <>
            <Button onClick={() => setLoginActive(true)}>{title}</Button>
            <Modal setActive={setLoginActive} active={loginActive} >
                {!isLoading 
                    ? (<>
                        {isError && <div className={styles.error}>Неправильно введен логин или пароль</div>}
                        <Input
                            className={styles.input}
                            title='Почта'
                            placeholder='name@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <Input
                            className={styles.input}
                            title='Пароль'
                            type='password'
                            placeholder='min. 8 characters'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <Button
                            className={styles.button}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Войти
                        </Button></>) 
                    : (<div>Проверка пароля...</div>)}
            </Modal>
        </>
  )
}