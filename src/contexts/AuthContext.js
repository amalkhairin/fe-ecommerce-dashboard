import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthAPI from "../api/AuthApi";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const loadUser = () => {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            const jwtPayload = jwtDecode(accessToken)
            const newUser = {
                id: jwtPayload.id,
                name: jwtPayload.name,
                email: jwtPayload.email,
                role: jwtPayload.role,
                username: jwtPayload.username,
                profilePictureUrl: jwtPayload.profilePictureUrl
            }

            setUser(newUser)
        }
    }

    useEffect(() => {
        setIsLoading(false)
        loadUser()
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }

    const isAuthenticated = () => !!user

    if (isLoading) {
        return <div>Loading</div>
    }

    const login = async (username, password) => {
        setIsLoading(true)
        const { access_token, refresh_token } = await AuthAPI.login(username, password)
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        loadUser()
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
}