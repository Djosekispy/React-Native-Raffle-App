import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';

type FormInputProps = {
  control: any;
  name: string;
  icon: any;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  placeholder: string;
};

export function FormInput({
  control,
  name,
  icon,
  error,
  secureTextEntry,
  keyboardType = 'default',
  placeholder
}: FormInputProps) {
  return (
    <View className="flex flex-col space-y-1 mb-4">
      <View className="relative flex-row items-center">
        <FontAwesome 
          name={icon}
          size={25} 
          color="#6B7280"
          style={{ position: 'absolute', left: 9, zIndex: 1 }}
        />
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={{ paddingLeft: 45 }}
            className="bg-gray-50 border border-gray-200 rounded-lg py-3 w-full text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholderTextColor="#9CA3AF"
              accessibilityLabel={placeholder}
            />
          )}
        />
      </View>
      {error && (
        <Text style={{ color: '#EA4335' }}>{error}</Text>
      )}
    </View>
 
 
  );
}