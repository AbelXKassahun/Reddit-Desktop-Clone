import React, { useState, useEffect, useContext }from 'react';

const userInfnContext = React.createContext();

export const useInfn = () => {
    return useContext(userInfnContext)
}

const Cache = ({children}) => {
    const [ theme, setTheme ] = useState('dark')
    const [ userId, setUserId ] = useState(null)
    const [ email, setEmail ] = useState(null)
    const [ username, setUsername ] = useState(null)
    const [ localPass, setLocalPass ] = useState(null)
    const [ otherAccounts, setOtherAccounts ] = useState(null)
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ update, setUpdate ] = useState(false)
    const [ ownedSub, setOwnedSub] = useState(null)


    useEffect(() => {

        // fetch the user preference from the cache
        // JSON.parse to convert the JSON string back into an object
        const cache = JSON.parse(localStorage.getItem('cache'))
        // if the cache exists
        if(cache){
            console.log("cache exists");
            setTheme(cache.themePreference)
            setLoggedIn(cache.loggedIn)
            setUserId(cache.currentlySignedIn)
            setEmail(cache.email)
            setUsername(cache.username)
            setLocalPass(cache.localPassword)
            setOtherAccounts(cache.otherAcc)
        }

        // when a user logs or signs up
        if(update){
            const data = { 
                themePreference: theme, 
                loggedIn: loggedIn, 
                currentlySignedIn: userId,
                email: email,
                username: username,
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
    },[theme, loggedIn, userId, email, username, localPass, otherAccounts])


    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        setUpdate(true)
    }

    const signedIn = (uid, username) => {
        setUserId(uid)
        setUsername(username)
        setLoggedIn(true)
        setUpdate(true)
    }

    const create_account = (email) =>{
        setEmail(email)
        setUpdate(true)
    }

    const logout = () => {
        setUpdate(false)
        localStorage.clear();

        setUserId(null)
        setEmail(null)
        setUsername(null)
        setLoggedIn(false)
        setOwnedSub(null)
    }

    const owned_sub = (sub_id) => {
        setOwnedSub(sub_id)
    }

    const demo = () => {
        // setEmail(null)
        // setUsername(null)
        setUpdate(false)
        localStorage.clear();
    }

    const toggleLocalPassword = (lp) => {
        setLocalPass(lp)
        setUpdate(true)
    }

    const toggleOtherAccounts = (otacc) => {
        setOtherAccounts(otacc)
        setUpdate(true)
    }
    const getCurrentDate = () => {
        const currentDate = new Date();

        // Get year, month, day, hour, minute, and second
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        // Construct the formatted date string
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    const getTimeDifference = (dateString) => {
        const currentDate = new Date();
        const pastDate = new Date(dateString);

        const differenceInMilliseconds = currentDate - pastDate;
        const differenceInSeconds = differenceInMilliseconds / 1000;
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        const differenceInHours = Math.floor(differenceInSeconds / 3600);
        const differenceInDays = Math.floor(differenceInSeconds / (3600 * 24));
        const differenceInWeeks = Math.floor(differenceInSeconds / (3600 * 24 * 7));
        const differenceInMonths = Math.floor(differenceInSeconds / (3600 * 24 * 30));
        const differenceInYears = Math.floor(differenceInSeconds / (3600 * 24 * 365));
    
        if (differenceInYears > 0) {
            return `${differenceInYears} year${differenceInYears > 1 ? 's' : ''} ago`;
        } else if (differenceInMonths > 0) {
            return `${differenceInMonths} month${differenceInMonths > 1 ? 's' : ''} ago`;
        } else if (differenceInWeeks > 0) {
            return `${differenceInWeeks} week${differenceInWeeks > 1 ? 's' : ''} ago`;
        } else if (differenceInDays > 0) {
            return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
        } else if (differenceInHours > 0) {
            return `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
        } else if (differenceInMinutes > 0) {
            return `${differenceInMinutes} minute${differenceInMinutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }

    const value = {
        update,
        theme,
        loggedIn,
        userId,
        email,
        username,
        ownedSub,
        localPass,
        otherAccounts,
        toggleTheme,
        signedIn,
        logout,
        demo,
        getCurrentDate,
        getTimeDifference,
        owned_sub,
        toggleLocalPassword,
        toggleOtherAccounts,
    }
    return (
        <userInfnContext.Provider value = {value}>{children}</userInfnContext.Provider>
    );
}

export default Cache;