import { User } from "@/interfaces/user";

interface UserRepositoryInterface {
    create(user: User): Promise<{ success: boolean; error?: string }>;
    get(): Promise<User | null>;
    delete(): Promise<{ success: boolean; error?: string }>;
    update(user: User): Promise<{ success: boolean; error?: string }>;
}

export default UserRepositoryInterface;