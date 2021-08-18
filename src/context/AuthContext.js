import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { auth } from "../firebase";

const AuthContext = React.createContext()

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory()
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
            history.push('/chat')
        })
    }, [user, history]);

    return <AuthContext value={user}>{!loading && children}</AuthContext>
}

export {AuthContext, AuthProvider}