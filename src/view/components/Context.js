import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import client from 'gamja-backend-client';

const AuthContext = createContext();

const host = 'https://api.miruku.dog';

export const useAuth = () => {
    const [cookies] = useCookies(['token']);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const { token } = cookies;
  
          if (token) {
            const getConnection = {
              host: host,
              headers: {
                'Authorization': `Bearer ${token}`
              }
            };
  
            try {
              const response = await client.functional.user.me.getMyUser(getConnection);
              const userName = response.user.name;
              setUser({ name: userName }); 
            } catch (error) {
              console.error("Error fetching user data:", error);
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      };
  
      checkLoginStatus();
    }, [cookies.token]);
  
    return { user };
  };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
}