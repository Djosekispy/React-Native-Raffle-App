import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof FontAwesome.glyphMap;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <View className="flex-1 bg-green-100 p-4 rounded-lg shadow-sm mr-4">
    <View className="flex-row items-center mb-2">
      <FontAwesome name={icon} size={20} color="#4CAF50" style={{ marginRight: 8 }} />
      <Text className="text-lg font-bold text-green-800">{label}</Text>
    </View>
    <Text className="text-2xl font-bold text-green-600">{value}</Text>
  </View>
);

export default StatCard;
