import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type SocialButtonProps = {
  icon: keyof typeof FontAwesome.glyphMap; 
  label: string;
  color: string;
  onPress: () => void;
};

export function SocialButton({ icon, label, color, onPress }: SocialButtonProps) {
  return (
    <TouchableOpacity
    className="flex-1 flex-row items-center justify-center py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
    accessibilityRole="button"
    accessibilityLabel="Entrar com Google"
  >
    <FontAwesome name={icon} size={20} color={color} />
    <Text className="ml-2 font-medium text-gray-700">{label}</Text>
  </TouchableOpacity>
  );
}