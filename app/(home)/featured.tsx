import { useAuth } from "@/context";
import { IInscricoes } from "@/interfaces/IInscricoes";
import { IRaffle, StatusRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";

function formatarData(data: string) {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const date = new Date(data);
  const mes = meses[date.getMonth()];
  const ano = date.getFullYear();

  return `${mes} ${ano}`;
}

const RaffleSearchView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avaliableRaffles, setAvaliableRaffles] = useState<IInscricoes[]>([]);
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null); 
  const { user } = useAuth();
  const router = useRouter();

  const searchRaffles = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/users/me/participations", {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });
      setAvaliableRaffles(response.data.user);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Error fetching raffles:", error.response?.data?.message);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id)); 
  };

  useEffect(() => {
    searchRaffles();
  }, []);

  return (
    <View className="flex-1 bg-white px-4 pt-12">
         
 <Text className="text-xl font-bold mb-4">Hisórico de participação</Text>

<View className="flex-row items-center py-4 mb-4 gap-2">
  <Text className="text-justify">
      Listamos todas as suas participações em sorteios, fique a vontade para ver todos os detalhes
  </Text>
</View>


      <FlatList
        showsVerticalScrollIndicator={false}
        data={avaliableRaffles}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const isExpanded = expandedItemId === item.id;
          return (
            <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <TouchableOpacity onPress={() => toggleExpand(parseInt(String(item.id)))}>
                <View className="relative">
                  <Image
                    source={{ uri: item.item?.categoria?.sorteio?.cover }}
                    className="w-full h-44"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 right-2 bg-black text-white text-xs font-medium py-1 px-2 rounded flex-row items-center">
                    <Ionicons name="ticket" size={12} color="white" />
                    <Text className="ml-1 text-white">{item.item?.categoria?.nome}</Text>
                  </View>
                </View>
                <View className="p-4">
                  <Text className="text-lg font-bold mb-2">{item.item?.nome}
                  </Text>
                
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="calendar" size={20} color="gray" />
                    <Text className="text-sm text-gray-600 ml-2 font-medium">
                      {formatarData(String(item.item?.categoria?.sorteio?.data_realizacao))}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons
                      name={item.item?.categoria?.sorteio?.status === StatusRaffle.now ? "checkmark-circle" : "close-circle"}
                      size={20}
                      color={item.item?.categoria?.sorteio?.status === StatusRaffle.now ? "green" : "red"}
                    />
                    <Text
                      className={`text-sm font-medium ml-2 ${
                        item.item?.categoria?.sorteio?.status === StatusRaffle.now ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.item?.categoria?.sorteio?.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {isExpanded && (
                        <View className="bg-gray-100 p-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="trophy" size={16} color="gray" className="mr-2" />
            <Text className="text-sm"> {item.item?.categoria?.sorteio?.nome}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="clipboard" size={16} color="gray" className="mr-2" />
            <Text className="text-sm">{item.item?.categoria?.sorteio?.politicas}</Text>
          </View>
        </View>

              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default RaffleSearchView;
