import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState("")

    const value = { user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
