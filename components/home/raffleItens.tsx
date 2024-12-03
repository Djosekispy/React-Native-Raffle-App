import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ItemProps = {
  id: string;
  image: string;
  title: string;
  description: string;
  inscritos: number;
};

const ItensSorteio = ({ items }: { items: ItemProps[] }) => {
  const [visibleItems, setVisibleItems] = useState(8);

  const renderItem = ({ item }: { item: ItemProps }) => (
    <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {/* Imagem do Item */}
      <Image
        source={{ uri: item.image }}
        className="w-full h-44"
        resizeMode="cover"
      />

      {/* Informações do Item */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-2" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-sm text-gray-600 mb-3" numberOfLines={2}>
          {item.description}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="people" size={16} color="gray" />
            <Text className="text-sm text-gray-600 ml-2">
              {item.inscritos} inscritos
            </Text>
          </View>
          <TouchableOpacity className="bg-green-500 py-1 px-4 rounded-lg">
            <Text className="text-white text-sm font-medium">Participar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 8); // Carrega mais 8 itens
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">Itens Disponíveis para Sorteio</Text>
      <FlatList
        data={items.slice(0, visibleItems)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      {visibleItems < items.length && (
        <TouchableOpacity
          onPress={handleLoadMore}
          className="bg-blue-500 py-2 px-4 rounded-lg self-center"
        >
          <Text className="text-white text-base font-medium">Ver Mais</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export { ItensSorteio, ItemProps };
