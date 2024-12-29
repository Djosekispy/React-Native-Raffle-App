import { IUserWithDoc } from "@/interfaces/IUserWithDoc";
import { User } from "@/interfaces/user";

interface UserRepositoryInterface {
    create(user: User): Promise<{ success: boolean; error?: string }>;
    get(): Promise<IUserWithDoc | null>;
    delete(): Promise<{ success: boolean; error?: string }>;
    update(user: IUserWithDoc): Promise<{ success: boolean; error?: string }>;
}

export default UserRepositoryInterface;