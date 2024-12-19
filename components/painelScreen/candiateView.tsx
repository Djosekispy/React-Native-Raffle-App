import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

interface Inscrito {
  id: number;
  name: string;
  status: string;
}

interface InscritosViewProps {
  inscritos: Inscrito[];
  onBack: () => void;
}

const InscritosView: React.FC<InscritosViewProps> = ({ inscritos, onBack }) => (
  <View className="flex-1 bg-gray-100 p-4">
    <Text className="text-xl font-bold mb-4">Inscritos do Sorteio</Text>
    <FlatList
      data={inscritos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="text-sm">Status: {item.status}</Text>
          {item.status === 'pendente' && (
            <TouchableOpacity className="bg-blue-600 py-2 px-4 rounded mt-2">
              <Text className="text-white">Analisar Candidatura</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    />
    <TouchableOpacity
      className="mt-4 py-2 px-4 bg-green-600 rounded"
      onPress={() => Alert.alert('PDF gerado!')}
    >
      <Text className="text-white">Imprimir PDF</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="mt-4 py-2 px-4 bg-red-600 rounded"
      onPress={onBack}
    >
      <Text className="text-white">Voltar</Text>
    </TouchableOpacity>
  </View>
);

export default InscritosView;
