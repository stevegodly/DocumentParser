import {createContext,useState} from 'react'

export const UserContext=createContext({})

export function UserContextProvider({children}){
    const[entities,setEntities]=useState([])
    return (
        <UserContext.Provider value={{entities,setEntities}}>
            {children}
        </UserContext.Provider>
    );
}
