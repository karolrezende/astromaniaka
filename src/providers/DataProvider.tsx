import baseURL from '@/environments/baseURL';

import React, { createContext,  useContext, useEffect, useState} from 'react';
import { useAuth } from './AuthProvider';
import { userWithoutPassword } from '@/types/user.types';

type DataContextType = {
    userData: userWithoutPassword | null
}

const DataContext = createContext<DataContextType>({} as DataContextType);


export const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const {token} = useAuth()

    const [userData,setUserData] = useState<userWithoutPassword|null>(null)

    const data = async() => {
        try {
            const data = await baseURL.get<userWithoutPassword>('/users/token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setUserData(data.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return error.response.status
        }
    }

    useEffect(()=> {
        data()
    },[])

    return (
        <DataContext.Provider value={{userData}}>
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => {
    return useContext(DataContext);
};
