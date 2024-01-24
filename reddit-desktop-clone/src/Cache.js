import React, { useState, useEffect, useContext }from 'react';

const userInfnContext = React.createContext();

export const useInfn = () => {
    return useContext(userInfnContext)
}

const Cache = ({children}) => {
    const [ theme, setTheme ] = useState('light')
    const [ userId, setUserId ] = useState(null)
    const [ localPass, setLocalPass ] = useState(null)
    const [ otherAccounts, setOtherAccounts ] = useState(null)
    const [ loggedIn, setLoggedIn ] = useState(true)
    const [ update, setUpdate ] = useState(false)

    useEffect(() => {

        // fetch the user preference from the cache
        // JSON.parse to convert the JSON string back into an object
        const cache = JSON.parse(localStorage.getItem('cache'))
        // if the cache exists
        if(cache){
            setTheme(cache.themePreference)
            setLoggedIn(cache.loggedIn)
            setUserId(cache.currentlySignedIn)
            setLocalPass(cache.localPassword)
            setOtherAccounts(cache.otherAcc)
        }

        if(update){
            const data = { 
                themePreference: theme, 
                loggedIn: loggedIn, 
                currentlySignedIn: userId, 
                localPassword: localPass, 
                otherAcc: otherAccounts
            }
            localStorage.clear();
            localStorage.setItem('cache', JSON.stringify(data))
            setUpdate(false);
        }

        return () => {
            // cleanup
        };
    },[theme, loggedIn, userId, localPass, otherAccounts])


    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        setUpdate(true)
    }

    const signedIn_loggedOut = (uid) => {
        setUserId(uid)
        setLoggedIn(loggedIn ? false : true)
        setUpdate(true)
    }

    const toggleLocalPassword = (lp) => {
        setLocalPass(lp)
        setUpdate(true)
    }

    const toggleOtherAccounts = (otacc) => {
        setOtherAccounts(otacc)
        setUpdate(true)
    }
    

    const value = {
        theme,
        loggedIn,
        userId,
        localPass,
        otherAccounts,
        toggleTheme,
        signedIn_loggedOut,
        toggleLocalPassword,
        toggleOtherAccounts,
    }
    return (
        <userInfnContext.Provider value = {value}>{children}</userInfnContext.Provider>
    );
}

export default Cache;