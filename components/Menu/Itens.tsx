import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { Link } from "expo-router";

interface IMenuItem {
    title : string;
    description : string; 
    link : string
}

export default function MenuItem({ title, description, link }: IMenuItem) {
    return (
        <Link href={link} asChild>
            <TouchableOpacity className="p-4">
                <View className="flex-row justify-between items-start">
                    <View>
                        <Text className="text-xl font-bold text-black">{title}</Text>
                        {description && (
                            <Text className="text-[#777] text-sm">{description}</Text>
                        )}
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#000" />
                </View>
            </TouchableOpacity>
        </Link>
    );
}
