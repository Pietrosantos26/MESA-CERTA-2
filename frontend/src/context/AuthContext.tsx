import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { updateUserProfile, deleteUserAccount } from '../services/api';

const API_URL = import.meta.env.VITE_API_URL;

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  updateUser: (userData: { username?: string, email?: string }) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mesaCerta_token'));
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/users/profile`, {
            headers: { 'x-auth-token': token },
          });
          
          if (response.ok) {
            const result = await response.json();
            setUser(result.data.user);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [token]);

 const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Falha no login');

      setUser(data.data.user);
      setToken(data.data.token);
      localStorage.setItem('mesaCerta_token', data.data.token);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || 'Falha no cadastro');

        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('mesaCerta_token', data.data.token);
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('mesaCerta_token');
  };

  const updateUser = async (userData: { username?: string, email?: string }) => {
    try {
      const result = await updateUserProfile(userData);
      if (result.success) {
        // Atualiza o estado do usuário com os novos dados recebidos da API
        setUser(result.data.user);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil no contexto:", error);
      throw error; // Lança o erro para a página de perfil poder exibi-lo
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteUserAccount();
      // Se a exclusão na API for bem-sucedida, faz o logout no frontend
      logout();
    } catch (error) {
      console.error("Erro ao deletar conta no contexto:", error);
      throw error; // Lança o erro para a página de perfil poder exibi-lo
    }
  };

 return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      register,
      isAuthenticated: !!token,
      // 3. DISPONIBILIZAMOS AS NOVAS FUNÇÕES
      updateUser,
      deleteAccount,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};