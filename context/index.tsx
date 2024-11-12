import { User } from '@/interfaces/user';
import { authService } from '@/model/service/auth';
import { useRouter } from 'expo-router';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';



type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | { error : string }>;
  register: (email: string, password: string, nome_completo: string, telefone: string) => Promise<User | { error : string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) : Promise<User | { error : string }> => {
    console.log('chegou no login');
    try {
      const user = await authService.login(email, password);
     
      if(user && 'error' in user){
        return { error : user.error}
      }
      setUser(user as User);
      return user as User;
    } catch (error) {
      return {error : 'Erro: ' + error };
    }
  };

  const register = async (email: string, password: string, nome_completo: string, telefone: string) : Promise<User | { error : string }> => {
    try {
      const user = await authService.register({ email, senha: password, nome_completo, telefone}); 
      if(user && 'error' in user){
        return { error : user.error}
      }
      setUser(user as User);
      return user as User;
    } catch (error) {
      return {error : 'Erro ao registrar: ' + error };
    }
  };

  const logout = async () => {
    const user = await authService.logout();
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
        register,
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