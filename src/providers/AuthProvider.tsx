/* eslint-disable @typescript-eslint/no-explicit-any */
import baseURL from '@/environments/baseURL';
import { DEMO_ACCOUNTS, DemoProfile } from '@/environments/demo';
import { userLogin } from '@/types/user.types';
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

type AuthContextType = {
    signin: (userLogin: userLogin) => Promise<number>,
    signout: () => void,
    token: string | null,
    demoProfile: DemoProfile,
    switchProfile: (profile: DemoProfile) => Promise<void>,
    demoError: boolean,
    retryDemo: () => void,
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const readProfile = (): DemoProfile =>
    window.localStorage.getItem('demoProfile') === 'admin' ? 'admin' : 'user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        return window.localStorage.getItem('token')
    }
    );
    const [demoProfile, setDemoProfile] = useState<DemoProfile>(readProfile);
    const [demoError, setDemoError] = useState(false);

    const signin = async (userLogin: userLogin): Promise<number> => {
        try {
            const token = await baseURL.post('/users/login', {
                email: userLogin.email,
                password: userLogin.password
            })

            window.localStorage.setItem('token', token.data.token)

            setToken(token.data.token)
            return token.status
        } catch (error: any) {
            console.log(error)
            return error.response?.status ?? 500
        }
    };

    // Entra com a conta do perfil escolhido, sem passar pela tela de login
    const enterDemo = useCallback(async (profile: DemoProfile) => {
        setDemoError(false);
        const account = DEMO_ACCOUNTS[profile];
        const status = await signin({ email: account.email, password: account.password });
        if (status === 200) {
            window.localStorage.setItem('demoProfile', profile);
            setDemoProfile(profile);
        } else {
            setDemoError(true);
        }
    }, []);

    useEffect(() => {
        if (!token) enterDemo(readProfile());
    }, [token, enterDemo]);

    const switchProfile = async (profile: DemoProfile) => {
        window.localStorage.removeItem('token');
        window.localStorage.setItem('demoProfile', profile);
        // Recarrega para todas as telas buscarem os dados com o novo perfil
        window.location.href = '/';
    }

    // Na demo, "sair" só descarta o token: a entrada automática acontece de novo
    const signout = () => {
        window.localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{
            signin,
            signout,
            token,
            demoProfile,
            switchProfile,
            demoError,
            retryDemo: () => enterDemo(readProfile()),
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};
