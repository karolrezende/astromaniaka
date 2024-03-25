import baseURL from '@/environments/baseURL';

import React, { createContext,  useContext, useEffect } from 'react';
import { useAuth } from './AuthProvider';

type DataContextType = {
   
}

const DataContext = createContext<DataContextType>({} as DataContextType);


export const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const {token} = useAuth()

    const data = async() => {
        try {
            const data = await baseURL.get('/users/token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return data
        } catch (error: any) {
            return error.response.status
        }
    }

    useEffect(()=> {
        data()
    }, [])

    return (
        <DataContext.Provider value={{data}}>
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => {
    return useContext(DataContext);
};
