import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context";
import { IRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import RaffleInfo from "@/components/raflle/info";
import CategoryList from "@/components/raflle/category";
import { ICategoria } from "@/interfaces/ICategory";
import { IItens } from "@/interfaces/IItens";
import ItemDetail from "@/components/raflle/detail_itens";

export default function DetailsPage() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [selected, SetSelected]= useState<number>(1)
  const [isLoading, setIsLoading] = useState(false);
  const [raffle, setRaffle] = useState<IRaffle | null>(null);
  const [categories, setCategories] = useState([]);
  const [itens, setItens] = useState([]);

  const onSelect = (id : number)=>SetSelected(id)
  const fetchRaffleDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/raffles/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });

      const fetchedRaffle = response.data.result;
      setRaffle(fetchedRaffle);
      const fetchedCategories = fetchedRaffle.categorias?.map((cat : ICategoria) => ({
        id: cat.id,
        nome: cat.nome,
      })) || [];
      setCategories(fetchedCategories);
      const fetchedItens = fetchedRaffle.categorias
      ?.flatMap((cat : ICategoria) =>
        cat.itens?.map((item : IItens) => ({
          category : cat.id,
          id: item.id,
          nome: item.nome,
          propriedades: item.propriedades,
          descricao: item.descricao,
        }))
      ) || [];
    setItens(fetchedItens);
console.log(JSON.stringify(fetchedItens))
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Erro na API:", error.response?.data?.message || "Erro desconhecido");
      } else {
        console.error("Erro inesperado:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRaffleDetails();
    }
  }, [id]);

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12 pb-20">
      <View className="flex-1 pb-12">
      <View className="flex-row items-center justify-start pb-4">
        <TouchableOpacity onPress={() => router.back()} className="ml-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-center flex-1">Detalhes do produto</Text>
        <View className="w-6" />
      </View>

      {isLoading ? (
        <ActivityIndicator color="gray" size={35} />
      ) : raffle ? (
        <>
          <RaffleInfo raffle={raffle} />
        </>
      ) : (
        <Text className="text-center text-gray-500 mt-10">
          Nenhum detalhe disponível para este sorteio.
        </Text>
      )}
    {categories && itens.length > 0 && itens.map((iten, index) => 
      (iten as any).category === selected && (
        <ItemDetail key={index} item={iten} owner={raffle?.organizadorId} onSubscribe={() => alert('Inscreveu-se')} />
      )
    )}
<View className="mb-4">
{categories.length > 0 && (
            <CategoryList categories={categories} selected={selected}  onSelect={onSelect} />
          )}
</View>
</View>
    </ScrollView>
  );
}
