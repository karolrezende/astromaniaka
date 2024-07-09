/* eslint-disable @typescript-eslint/no-explicit-any */
import baseURL from '@/environments/baseURL';
import { userLogin } from '@/types/user.types';
import React, { createContext, useState, useContext } from 'react';

type AuthContextType = {
    signin: (userLogin: userLogin) => Promise<number>,
    signout: () => void,
    token: string | null
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        return window.localStorage.getItem('token')
    }
    );

    const signin = async (userLogin: userLogin): Promise<number> => {
        try {
            const token = await baseURL.post('/users/login', {
                email: userLogin.email,
                password: userLogin.password
            })

            console.log('token')
            window.localStorage.setItem('token', token.data.token)

            setToken(token.data.token)
            return token.status
        } catch (error: any) {
            console.log(error)
            return error.response.status
        }
    };


    const signout = () => {
        window.localStorage.clear();
        window.location.href = '/login';
    }


    return (
        <AuthContext.Provider value={{ signin, signout, token }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};
