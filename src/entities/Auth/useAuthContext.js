import React from 'react';
import {AuthContext} from './AuthContext';
import {AuthService} from './AuthService';
import {useMutation, useQuery} from "react-query";

export const useAuthContext = () => {
    const storeContext = React.useContext(AuthContext);

    return {
        ...storeContext.store,
        setStore: (data) => {
            storeContext.setStore({ ...storeContext.store, ...data });
        }
    };
}

export const useExit = () => {
    const { setStore } = useAuthContext()
    return () => {
        setStore({isAuth: false})
        localStorage.removeItem('token')
    }
}

export const useIsAuth = () => {
    const { setStore, isAuth } = useAuthContext()
    const exit = useExit()
  
    const { isLoading } = useQuery(['user'],() => {
        const token = localStorage.getItem('token')
        if (token) {
            AuthService.auth().then(res => {
                setStore({ isAuth: true, user: res.data})
                return res.data
            }).catch(() => exit())
        }
    })
  
    return { isAuth, isLoading }
  
}

export const useRegistration = () => {
    const { mutateAsync, isLoading } = useMutation(
        (data) => AuthService.registration(data),
        {
            onSuccess: (res) => {
                localStorage.setItem('token', res.data.token)
                alert('you logged')
            },
            onError: (error) => {
                alert(error.message)
            },
        }
    )
    
    return { registerAsync: mutateAsync, isLoading}
}

export const useLogin = () => {
    const {setStore } = useAuthContext()
    const { mutateAsync, isLoading, isError } = useMutation(
        (data) => AuthService.login(data),
        {
            onSuccess: (res) => {
                localStorage.setItem('token', res.data.token)
                alert('you logged')
                setStore({ isAuth: true, user: res.data})
            },
            onError: (error) => {
                console.log(error)
            },
        }
    )
    return { loginAsync: mutateAsync, isLoading, isError}
}



