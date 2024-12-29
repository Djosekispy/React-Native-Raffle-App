import { User, UserSchema } from "@/interfaces/user";
import UserRepositoryInterface from "../UserRepository/IUserRepository";
import userRepository from "../UserRepository/userRepository";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";

class UserService {

    constructor(private userRepository: UserRepositoryInterface) {}

    updateLocalUserData = async (token ? : string) : Promise<void | { error: string }>=>{
        try {
            const user = await this.userRepository.get();
          
            const request = await api.get('/users/me',{
                headers: {
                    Authorization : `Bearer ${user?.token_acesso}`
                }
            });
                const updateUser = await this.userRepository.update(request.data);
                if (!updateUser.success) {
                    return { error: updateUser.error as string };
                }
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(JSON.stringify(error.response?.data))
                return { error: error.response?.data.message };
            } else {
                return { error: error as string };
            }
        }
    }

}

const userService = new UserService(userRepository);

export { userService };