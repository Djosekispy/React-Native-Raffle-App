import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { Href, Link } from "expo-router";

interface IMenuItem {
  title: string;
  description?: string;
  link: Href<string | object>;
}

export default function MenuItem({ title, description, link }: IMenuItem) {
  return (
    <Link href={link} asChild>
      <TouchableOpacity className="mb-4 bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition duration-200">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <Text className="text-xl font-semibold text-gray-800 mb-1">
              {title}
            </Text>
            {description && (
              <Text className="text-sm text-gray-500 leading-5">
                {description}
              </Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={24} color="#4B5563" />
        </View>
      </TouchableOpacity>
    </Link>
  );
}
