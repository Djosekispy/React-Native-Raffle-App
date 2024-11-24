import { User, UserSchema } from '@/interfaces/user';
import { authService } from '@/model/service/auth';
import { userService } from '@/model/service/user';
import { useRouter } from 'expo-router';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';



type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | { error : string }>;
  register: (email: string, password: string, nome_completo: string, telefone: string) => Promise<User | { error : string }>;
  logout: () => void;
  replaceLocalUseData : ()=> Promise<User | { error : string }>;
  updateUser : (data : UserSchema) => Promise<User | { error : string }>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) : Promise<User | { error : string }> => {
    try {
      const user = await authService.login(email, password);
     
      if(user && 'error' in user){
        return { error : user.error}
      }
     getUser();
      return user as User;
    } catch (error) {
      return {error : 'Erro ao logar: ' + error };
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
    router.replace('/login');
    setUser(null);
   
  };
   const getUser = async () => {
    const user = await authService.getUser();
    setUser(user);
    return user;
   };

  const updateUser = async(data : UserSchema):  Promise<User | { error : string }> =>{
    try {
      const user = await authService.update(data)
     
      if(user && 'error' in user){
        return { error : user.error}
      }
    await  getUser();
      return user as User;
    } catch (error) {
      return {error : 'Erro ao logar: ' + error };
    }
  }

const replaceLocalUseData = async():   Promise<User | { error : string }> =>{
  try {
    const user = await userService.updateLocalUserData();
   
    if(user && 'error' in user){
      return { error : user.error}
    }
 const userdata = await  getUser();
 return userdata as User;
  } catch (error) {
    return {error : 'Erro ao logar: ' + error };
  }
}


   useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      if (!user) {
        router.replace('/login');
      }
    };
    checkUser();
   }, []);


  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
        replaceLocalUseData 
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