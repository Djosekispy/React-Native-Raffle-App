import { User, UserSchema } from "@/interfaces/user";
import UserRepositoryInterface from "../UserRepository/IUserRepository";
import userRepository from "../UserRepository/userRepository";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";
import * as DocumentPicker from 'expo-document-picker';
import { IUserWithDoc } from "@/interfaces/IUserWithDoc";


class AuthService {

    constructor(private userRepository: UserRepositoryInterface) {}

    login = async (email: string, senha: string): Promise<User | null | { error: string }> => {
        try {
            const cleanData = await this.cleanInput(email, senha);
            if ('error' in cleanData) {
                return { error: cleanData.error };
            }
            const request = await api.post('/auth/login', cleanData);
            if (await this.userRepository.get() !== null) {
                const updateUser = await this.userRepository.update(request.data?.user);
                if (!updateUser.success) {
                    return { error: updateUser.error as string };
                }
            } else {
                const save = await this.userRepository.create(request.data?.user);
                if (!save.success) {
                    return { error: save.error as string };
                }
            }
            api.defaults.headers.common['Authorization'] = `Bearer ${request.data?.token}`;
            return await this.getUser();
        } catch (error) {
            if (isAxiosError(error)) {
                return { error: error.response?.data.message };
            } else {
                return { error: error as string };
            }
        }
    }

    cleanInput = async (email: string, senha: string): Promise<{ email: string; senha: string } | { error: string }> => {
        email = email.trim();
        senha = senha.trim();
        if (email === '' || senha === '') {
            return { error: 'Email e senha são obrigatórios' };
        }
        if (senha.length < 6) {
            return { error: 'Senha deve conter pelo menos 6 caracteres' };
        }
        if (!email.includes('@')) {
            return { error: 'Email inválido' };
        }
        return { email, senha };
    }

    logout = async (): Promise<void> => {
        const result = await this.userRepository.delete();
        if (!result.success) {
            console.log(result.error);
        }
    }

    getUser = async (): Promise<IUserWithDoc | null> => {
        return await this.userRepository.get();
    }

    register = async (data: User): Promise<User | null | { error: string }> => {
        try {
            const cleanData = await this.cleanInput(data.email, data.senha);
            const cleanDataRegister = {
                email: Object.values(cleanData)[0],
                senha: Object.values(cleanData)[1],
                nome_completo: data.nome_completo,
                telefone: data.telefone
            }
            const request = await api.post('/auth/register', cleanDataRegister);
            const save = await this.userRepository.create(request.data?.user);
            if (!save.success) {
                return { error: save.error as string };
            }
            return await this.getUser();
        } catch (error) {
            if (isAxiosError(error)) {
                return { error: error.response?.data.message };
            } else {
                return { error: error as string };
            }
        }
    }
    forgotPassword = async (email: string): Promise<User | { error: string }> => {
        try {
            const request = await api.post('/auth/forgot-password', { email });
            return request.data.user;
        } catch (error) {
            if (isAxiosError(error)) {
                return { error: error.response?.data.message };
            } else {
                return { error: error as string };
            }
        }
    }
    resetPassword = async (email: string, senha: string): Promise<User | { error: string }> => {
        try {
            const request = await api.post('/auth/reset-password', { email,senha });
            return request.data.user;
        } catch (error) {
            if (isAxiosError(error)) {
                return { error: error.response?.data.message };
            } else {
                return { error: error as string };
            }
        }
    }

    update = async (data:UserSchema) : Promise<IUserWithDoc | null | { error: string }>=>{
        try {
            
            const request = await api.put('/update', data,{
                headers: {
                    Authorization : `Bearer ${data.token_acesso}`
                }
            });
                const updateUser = await this.userRepository.update(request.data?.user);
                if (!updateUser.success) {
                    return { error: updateUser.error as string };
                }
            return await this.getUser();
        } catch (error) {
            if (isAxiosError(error)) {
                return { error: error.response?.data.message };
            } else {
                return { error: error as string };
            }
        }
    }

    
    updateProfileImage = async (data:DocumentPicker.DocumentPickerAsset,token?: string) : Promise<User | null | { error: string }>=>{
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: data.uri,
                type: data.mimeType,
                name: data.name,
            } as any) 
            const tokenDeAcesso = await this.getUser();
            const request = await api.put('/users/photo', formData,{
                headers: {
                 "Content-Type":"multipart/form-data",
                    Authorization : `Bearer ${tokenDeAcesso?.token_acesso}`
                }
            });
                const updateUser = await this.userRepository.update(request.data?.user);
                if (!updateUser.success) {
                    console.log('update Repository',JSON.stringify(updateUser))
                    return { error: updateUser.error as string };
                }
                
            return await this.getUser();
        } catch (error) {
            if (isAxiosError(error)) {
                console.log('Catch Axios',JSON.stringify(error))
                return { error: error.response?.data.message };
            } else {
                console.log('Catch normal',JSON.stringify(error))
                return { error: error as string };
            }
        }
    }
}

const authService = new AuthService(userRepository);

export { authService };