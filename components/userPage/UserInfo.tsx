import React from 'react';
import { View, Text } from 'react-native';

interface UserInfoProps {
    label?: string;
    value?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ label, value }) => {
    return (
        <View className="my-2 flex-row">
            <Text className="text-gray-400">{label}:</Text>
            <Text className="font-bold text-base">{value}</Text>
        </View>
    );
};

export default UserInfo;