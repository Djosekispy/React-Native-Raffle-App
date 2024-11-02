import { useRouter } from 'expo-router';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
 const router = useRouter();
  const login = async (email: string, password: string) => {
    try {
      
      setUser({ id: '1', email }); // Exemplo simplificado
    } catch (error) {
      throw new Error('Erro ao fazer login');
    }
  };

  const logout = () => {
    setUser(null);
   
  };

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);


  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        login,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}