import { TouchableOpacity, Text } from "react-native";

const Button = ({ title, onPress, style }: { title: string; onPress: () => void; style?: string }) => {
  return (
    <TouchableOpacity onPress={onPress} className={`bg-blue-500 py-3 px-6 rounded-lg ${style}`}>
      <Text className="text-white text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
