import baseURL from '@/environments/baseURL';

import React, { createContext,  useContext, useEffect, useState} from 'react';
import { useAuth } from './AuthProvider';
import { userWithoutPassword } from '@/types/user.types';

type DataContextType = {
    userData: userWithoutPassword | null
}

const DataContext = createContext<DataContextType>({} as DataContextType);


export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, signout } = useAuth();
    const [userData, setUserData] = useState<userWithoutPassword | null>(null);

    const fetchData = async () => {
        try {
            const response = await baseURL.get<userWithoutPassword>('/users/token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data);
        } catch (error) {
            signout();
        }
    };

    useEffect(() => {
        if (token) {
            fetchData(); 
        }
    }, [token]); 

    return (
        <DataContext.Provider value={{ userData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
