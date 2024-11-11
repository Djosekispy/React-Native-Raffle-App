import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import { useState } from 'react';

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
  const [focused, setFocused] = useState(false);
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
            style={{
              backgroundColor: '#F9FAFB',
              borderWidth: 1,
              borderColor: (focused && !error) ? '#E5E7EB' : (!focused && error) ? '#EA4335' : '#E5E7EB',
              borderRadius: 8,
              paddingVertical: 12,
              width: '100%',
              color: '#374151',
              paddingLeft: 45
            }}
            onPressIn={() => {
              setFocused(true);
            }}
            onPressOut={() => {
              setFocused(false);
            }}
            placeholderTextColor="#9CA3AF"
              accessibilityLabel={placeholder}
            />
          )}
        />
      </View>
     
    </View>
 
 
  );
}