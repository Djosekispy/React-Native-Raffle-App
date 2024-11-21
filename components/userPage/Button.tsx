import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ title, onPress }: { title: string, onPress: () => void }) => {
    return (
        <TouchableOpacity 
        onPress={onPress}
            style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}
        >
           <Text className="text-white">{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;