import React from 'react';

const getInitialAuthState = () => ({
    isAuth: false,
        user: {
            id: '',
            email: '',
            fileCount: 9,
            usedCount: 0
        }
    })

export const AuthContext = React.createContext({
    store: getInitialAuthState(),
    setStore: () => ({})
})

export const AuthProvider = ({ children }) => {
    const [store, setStore] = React.useState(getInitialAuthState());
    const value = React.useMemo(() => ({store, setStore}), [store]);
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
