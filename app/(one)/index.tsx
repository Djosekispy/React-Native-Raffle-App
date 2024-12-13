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

export default function DetailsPage() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [raffle, setRaffle] = useState<IRaffle | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

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

      const fetchedCategories = fetchedRaffle.categorias?.map((cat: any) => cat.nome) || [];
      setCategories(fetchedCategories);
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
      <View className="flex-row items-center justify-between">
        {/* Botão de voltar */}
        <TouchableOpacity onPress={() => router.back()} className="ml-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Título Central */}
        <Text className="text-xl font-bold text-center flex-1">Detalhes do produto</Text>

        {/* Espaço reservado para balancear o layout */}
        <View className="w-6" />
      </View>

      {isLoading ? (
        <ActivityIndicator color="gray" size={35} />
      ) : raffle ? (
        <>
          {/* Informações do sorteio */}
          <RaffleInfo raffle={raffle} />

          {/* Lista de categorias */}
          {categories.length > 0 && (
            <CategoryList categories={categories} onSelect={(category) => alert(`Selecionou: ${category}`)} />
          )}
        </>
      ) : (
        // Mensagem de fallback
        <Text className="text-center text-gray-500 mt-10">
          Nenhum detalhe disponível para este sorteio.
        </Text>
      )}
    </ScrollView>
  );
}
