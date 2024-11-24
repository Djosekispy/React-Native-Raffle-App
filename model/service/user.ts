import { User, UserSchema } from "@/interfaces/user";
import UserRepositoryInterface from "../UserRepository/IUserRepository";
import userRepository from "../UserRepository/userRepository";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";

class UserService {

    constructor(private userRepository: UserRepositoryInterface) {}

    updateLocalUserData = async (token ?: string) : Promise<void | { error: string }>=>{
        try {
            const request = await api.get('/users/me',{
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });
                const updateUser = await this.userRepository.update(request.data?.user);
                if (!updateUser.success) {
                    return { error: updateUser.error as string };
                }
        } catch (error) {
            if (isAxiosError(error)) {
                return { error: error.response?.data.message };
            } else {
                return { error: error as string };
            }
        }
    }

}

const userService = new UserService(userRepository);

export { userService };