import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, View, Text, Image } from 'react-native';

// Função de formatação de data
const formatarData = (data: string) => {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  const [ano, mes] = data.split("-");
  return `${meses[parseInt(mes, 10) - 1]} ${ano}`;
};

const ListaResultados = ({ filteredResults }: { filteredResults: any[] }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16;

  // Itens paginados com base na página atual
  const paginatedData = filteredResults.slice(0, currentPage * itemsPerPage);

  const handleLoadMore = () => {
    if (currentPage * itemsPerPage < filteredResults.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <FlatList
      data={paginatedData}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
      renderItem={({ item }) => (
        <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4 w-[48%]">
          {/* Imagem */}
          <View className="relative">
            <Image
              source={{ uri: item.image }}
              className="w-full h-44"
              resizeMode="cover"
              style={{ aspectRatio: 1 / 1 }}
            />

            {/* Categoria */}
            <Text className="absolute bottom-2 left-2 bg-black text-white text-xs font-medium py-1 px-2 rounded">
              {item.category}
            </Text>

            {/* Total de Inscritos */}
            <View className="absolute top-2 right-2 bg-black text-white text-xs font-medium py-1 px-2 rounded flex-row items-center">
              <Ionicons name="people" size={12} color="white" />
              <Text className="ml-1 text-white">{item.inscritos}</Text>
            </View>
          </View>

          {/* Conteúdo */}
          <View className="p-4">
            <Text numberOfLines={1} className="text-lg font-bold mb-2">
              {item.title}
            </Text>
            <View className="flex-row items-center mb-1">
              <Ionicons name="calendar" size={20} color="gray" />
              <Text className="text-sm text-gray-600 ml-2 font-medium">
                {formatarData(item.data)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons
                name={
                  item.estado === "Aberto" ? "checkmark-circle" : "close-circle"
                }
                size={20}
                color={item.estado === "Aberto" ? "green" : "red"}
              />
              <Text
                className={`text-sm font-medium ml-2 ${
                  item.estado === "Aberto"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.estado}
              </Text>
            </View>
          </View>
        </View>
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListaResultados;
