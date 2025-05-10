import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    
    const [isAuthenticated, setIsAuthenticated] = useState(()=>!!localStorage.getItem('token'));

    useEffect(()=>{
        const checkAuth = ()=>setIsAuthenticated(!!localStorage.getItem('token'));
        window.addEventListener("storage",checkAuth)
        return ()=>window.removeEventListener("storage",checkAuth);
    },[]);

    const login = (token)=>{
        console.log(token)
        
        localStorage.setItem('token',token);
        setIsAuthenticated(true)
    }
    const logout = ()=>{
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }
return (
    <AuthContext.Provider value={{isAuthenticated,login,logout}}>
        {children}
    </AuthContext.Provider>
)

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = ()=>useContext(AuthContext);