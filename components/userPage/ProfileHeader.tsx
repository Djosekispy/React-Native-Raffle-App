import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, Button } from 'react-native';

interface ProfileHeaderProps {
    name?: string;
    email?: string;
    image? : string
}
const userAvatar = 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, image }) => {
    return (
        <View className="p-5 bg-gray-100 border-b border-gray-300 flex flex-row gap-4 items-center">
            <View className="mr-4">
                <Image
                    source={{uri : image ? image : userAvatar}}
                    style={{ width: 80, height: 80, borderRadius: 50 }}
                />
            </View>
            <View>
                <Text className="text-2xl font-bold">{name}
                    <Link href='/(user)/edit' asChild>
                    
                    <Text className="text-gray-700">{'\u270E'}</Text>
                    </Link>
                    </Text>
                <Text className="text-gray-700">{email}</Text>
            </View>
        </View>
    );
};

export default ProfileHeader;