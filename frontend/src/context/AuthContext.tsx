import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { users } from '../data/users';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('mesaCerta_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(u => u.email === email);
        // In a real app, we would check the password hash
        if (foundUser && password) {  // simplified check for demo
          setUser(foundUser);
          localStorage.setItem('mesaCerta_user', JSON.stringify(foundUser));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000); // Simulate network delay
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const userExists = users.some(u => u.email === email);
        if (userExists) {
          setLoading(false);
          reject(new Error('Email já está em uso'));
          return;
        }

        // In a real app, we would create a new user in the database
        const newUser: User = {
          id: `${users.length + 1}`,
          name,
          email,
          role: 'customer',
        };

        // For demo purposes, we're not actually adding to the users array
        // as it would reset on page refresh
        setUser(newUser);
        localStorage.setItem('mesaCerta_user', JSON.stringify(newUser));
        setLoading(false);
        resolve();
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mesaCerta_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};