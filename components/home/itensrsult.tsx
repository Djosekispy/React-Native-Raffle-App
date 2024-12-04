import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';

// Função de formatação de data
const formatarData = (data: string) => {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  const [ano, mes] = data.split("-");
  return `${meses[parseInt(mes, 10) - 1]} ${ano}`;
};

const ListaResultados = ({ filteredResults , label, goToDetails}: { filteredResults: any[], label : string, goToDetails(id : number): void }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16;
  const router = useRouter();

  // Dados paginados ou completos, dependendo do estado
  const paginatedData = isExpanded
    ? filteredResults
    : filteredResults.slice(0, currentPage * itemsPerPage);

  const handleToggleView = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <View>
      {/* Título com botão Ver Mais/Menos */}
      <View className="flex-row justify-between items-center my-6">
        <Text className="text-2xl font-bold text-gray-800">{label}</Text>
        <TouchableOpacity
          onPress={handleToggleView}
          className="flex-row items-center"
        >
          <Text className="text-blue-500 font-medium mr-2">
            {isExpanded ? "Ver Menos" : "Ver Mais"}
          </Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={16}
            color="blue"
          />
        </TouchableOpacity>
      </View>

      {/* Lista de resultados */}
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-4 w-[48%]">
            {/* Imagem */}
            <View className="relative">
              <Image
                source={{ uri: item.cover }}
                className="w-full h-44"
                resizeMode="cover"
                style={{ aspectRatio: 1 / 1 }}
              />

              {/* Categoria */}
              {/* Total de Inscritos */}
              <View className="absolute top-2 right-2 bg-black text-white text-xs font-medium py-1 px-2 rounded flex-row items-center">
                <Ionicons name="ticket" size={12} color="white" />
                <Text className="ml-1 text-white">{item.categorias.length || "00"}</Text>
              </View>
            </View>

            {/* Conteúdo */}
            <View className="p-4">
              <Text
                onPress={() => goToDetails(item.id)}
                numberOfLines={1}
                className="text-lg font-bold mb-2"
              >
                {item.nome}
              </Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="calendar" size={20} color="gray" />
                <Text className="text-sm text-gray-600 ml-2 font-medium">
                  {formatarData(item.data_realizacao)}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons
                  name={
                    item.status === "corrente" ? "checkmark-circle" : "close-circle"
                  }
                  size={20}
                  color={item.status === "corrente" ? "green" : "red"}
                />
                <Text
                  className={`text-sm font-medium ml-2 ${
                    item.status === "corrente"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ListaResultados;
