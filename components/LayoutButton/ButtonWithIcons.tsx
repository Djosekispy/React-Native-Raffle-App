import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, Text, View } from 'react-native';

const ButtonWithIcons = ({ icon: Icon, label, onPress, active }: { icon: keyof typeof FontAwesome.glyphMap; label: string; onPress: ()=>void; active : boolean}) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 10 }}
      onPress={onPress}
      className=" rounded-lg p-2 group transition duration-200 ease-in-out"
    >
      <FontAwesome
        name={Icon}
        size={45}
        color={ active ? '#FF7F50' : '#37474f'}
        className="text-gray-600 group-hover:text-blue-500 group-active:text-white transition duration-200"
      />
    </TouchableOpacity>
  );
};

export default ButtonWithIcons;
