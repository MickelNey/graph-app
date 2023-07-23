import React, {useState} from 'react'
import {Button, Modal, Input} from "../../shared"
import {useRegistration} from "../../entities/Auth/useAuthContext"
import styles from './RegistrationModal.module.css'

export const RegistrationModal = ({ title = 'Войти'}) => {
    const [registrationActive, setRegistrationActive] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [isConfirm, setIsConfirm] = useState(false)
    const { registerAsync, isLoading, isError } = useRegistration()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPass) setIsConfirm(true)
        else { 
            setIsConfirm(false)
            await registerAsync({
                email: email,
                password: password
            })
            setRegistrationActive(false)
        }
    }

    return (
        <>
            <Button onClick={() => setRegistrationActive(true)}>{title}</Button>
            <Modal setActive={setRegistrationActive} active={registrationActive} >
                {!isLoading 
                    ? (<>
                        {isError && <div className={styles.error}>Неправильно введен логин или пароль</div>}
                        {isConfirm && <div className={styles.error}>Несоответствие паролей</div>}
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
                        <Input
                            className={styles.input}
                            title='Повторите пароль'
                            type='password'
                            placeholder='min. 8 characters'
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)} />
                        <Button
                            className={styles.button}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Регистрация
                        </Button></>) 
                    : (<div>Проверка пароля...</div>)}
            </Modal>
        </>
  )
}