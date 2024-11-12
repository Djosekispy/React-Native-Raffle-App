import { User } from "@/interfaces/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserRepositoryInterface from "./IUserRepository";

class UserRepository implements UserRepositoryInterface {

    create = async (user: User): Promise<{ success: boolean; error?: string }> => {
        try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonValue);
            return { success: true };
        } catch (e) {
            return { success: false, error: 'Erro ao salvar o usuário: ' + e };
        }
    }

    get = async (): Promise<User | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            return null;
        }
    }

    delete = async (): Promise<{ success: boolean; error?: string }> => {
        try {
            await AsyncStorage.removeItem('user');
            return { success: true };
        } catch (e) {
            return { success: false, error: 'Erro ao deletar o usuário: ' + e };
        }
    }

    update = async (user: User): Promise<{ success: boolean; error?: string }> => {
        try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonValue);
            return { success: true };
        } catch (e) {
            return { success: false, error: 'Erro ao atualizar o usuário: ' + e };
        }
    }
}

const userRepository = new UserRepository();

export default userRepository;