import { useAuth } from '@/context';
import { IItens } from '@/interfaces/IItens';
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ItemDetailProps {
  item: IItens;
  onSubscribe: (itemId: number) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onSubscribe }) => {
  const { user } = useAuth();

  // Verifica se o usuário está entre os inscritos
  const isUserSubscribed = useMemo(() => {
    return item.inscricoes?.some((inscricao) => inscricao.usuarioId === user?.id);
  }, [item.inscricoes, user?.id]);

  return (
    <View className="flex-1 bg-white p-4 rounded-lg shadow-md">
      {/* Nome do Item */}
      <Text className="text-xl font-bold text-gray-800 mb-2">{item.nome}</Text>

      {/* Descrição */}
      <Text className="text-base text-gray-600 mb-4">{item.descricao}</Text>

      {/* Propriedades */}
      <View className="mb-4  flex-row gap-4 flex-wrap">
        {Object.entries(item.propriedades).map(([key, value]) => (
          <Text key={key} className="text-sm text-gray-500 mr-2">
            {key}: {value}
          </Text>
        ))}
      </View>

      {/* Total de Inscritos */}
      <Text className="text-base font-bold text-gray-700 mb-4">
        Total de Inscritos: {item.inscricoes?.length || 0}
      </Text>

      {/* Botão de Inscrição */}
      {!isUserSubscribed ? (
        <TouchableOpacity
          className="bg-[#FF7F50] rounded-md p-4 mb-12"
          onPress={() => onSubscribe(item.id!)}
        >
          <Text className="text-white text-lg text-center font-medium">Tornar-se participante</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-green-600 italic">Você já está inscrito!</Text>
      )}
    </View>
  );
};

export default ItemDetail;
