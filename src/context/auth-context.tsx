'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  signup: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('lottoUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('lottoUser');
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (email: string): boolean => {
    try {
      const storedUsers = localStorage.getItem('lottoUsersDb');
      const users: string[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      if (users.includes(email)) {
        const currentUser = { email };
        setUser(currentUser);
        localStorage.setItem('lottoUser', JSON.stringify(currentUser));
        router.push('/');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lottoUser');
    localStorage.removeItem('lottoHistory');
    router.push('/login');
  };
  
  const signup = (email: string) => {
    try {
      const storedUsers = localStorage.getItem('lottoUsersDb');
      let users: string[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      if (!users.includes(email)) {
        users.push(email);
        localStorage.setItem('lottoUsersDb', JSON.stringify(users));
      }
      
      // Log the user in after signup (or if they already exist)
      const newUser = { email };
      setUser(newUser);
      localStorage.setItem('lottoUser', JSON.stringify(newUser));
      router.push('/');
    } catch (error) {
        console.error("Signup error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
