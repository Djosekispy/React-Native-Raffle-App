import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IRaffle } from '@/interfaces/IRaffles';

interface RaffleItemProps {
  raffle: IRaffle;
  onViewDetails: (id: string) => void;
  onViewInscritos: (raffle: IRaffle) => void;
}

const RaffleItem: React.FC<RaffleItemProps> = ({ raffle, onViewDetails, onViewInscritos }) => (
  <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
    <Text className="text-lg font-bold mb-2">{raffle.nome}</Text>
    <View className="flex-row justify-between">
      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded"
        onPress={() => onViewDetails(String(raffle.id))}
      >
        <Text className="text-white">Ver Detalhes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-500 py-2 px-4 rounded"
        onPress={() => onViewInscritos(raffle)}
      >
        <Text className="text-white">Ver Inscritos</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default RaffleItem;
