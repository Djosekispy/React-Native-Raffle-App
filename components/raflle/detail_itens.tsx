import { useAuth } from '@/context';
import { IItens } from '@/interfaces/IItens';
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ItemDetailProps {
  item: IItens;
  owner: number | undefined;
  onSubscribe: (itemId: number) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onSubscribe , owner}) => {
  const { user } = useAuth();
  // Verifica se o usuário está entre os inscritos
  const isUserSubscribed = useMemo(() => {
    return item.inscricoes?.some((inscricao) => inscricao.usuarioId === user?.id);
  }, [item.inscricoes, user?.id]);

  console.log(JSON.stringify(item))
  return (
    <View className="flex-1 bg-white px-4 pb-4 rounded-lg shadow-md">
      {/* Nome do Item */}
      <Text className="text-xl font-bold text-gray-800 mb-2">{item.nome}</Text>

      {/* Descrição */}
      <Text className="text-base text-gray-600 mb-4">{item.descricao}</Text>

      {/* Propriedades */}
      <View className="mb-4 flex-row gap-4 flex-wrap">
        {Object.entries(item.propriedades).map(([key, value]) => (
          <View key={key} className="flex-row items-center gap-2 p-2 bg-gray-100 rounded-lg">
            <Text className="text-sm text-gray-600 font-medium">{key}:</Text>
            <Text className="text-sm text-gray-700">{value}</Text>
          </View>
        ))}
      </View>

      {/* Total de Inscritos */}
      <Text className={`text-base font-bold ${item.inscricoes && item.inscricoes?.length > 0 ? 'text-green-600' : 'text-red-600'} mb-4`}>
        Total de Inscritos: {item.inscricoes?.length || 0}
      </Text>

      {/* Botão de Inscrição */}
      {owner !== user?.id && (!isUserSubscribed ? (
        <TouchableOpacity
          className="bg-[#FF7F50] rounded-md p-4 mb-12"
          onPress={() => onSubscribe(item.id!)}
        >
          <Text className="text-white text-lg text-center font-medium">Tornar-se participante</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-green-600 italic">Você já está inscrito!</Text>
      ))
      
      }

    </View>
  );
};

export default ItemDetail;
