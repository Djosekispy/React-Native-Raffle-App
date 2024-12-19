import React from 'react';
import { View, Text } from 'react-native';

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => (
  <View className="bg-blue-100 p-4 rounded-lg shadow-sm mb-4">
    <Text className="text-lg font-bold text-blue-800">{title}</Text>
    <Text className="text-sm text-blue-600">{description}</Text>
  </View>
);

export default InfoCard;
