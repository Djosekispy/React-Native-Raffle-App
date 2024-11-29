import ImageCarousel from "@/components/home/carrosel";
import ListaResultados from "@/components/home/itensrsult";
import BannerPublicidade from "@/components/home/publicity";
import ProfileHeader from "@/components/userPage/ProfileHeader";
import { useAuth } from "@/context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";


const images = [
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
 "https://picsum.photos/800/600",
];

    
const HomePage = () => {
  const { user} = useAuth();

  // Mock de resultados
  const resultados = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Sorteio ${i + 1}`,
    image:  "https://picsum.photos/800/600",
    category: `Categoria ${i % 5 + 1}`,
    inscritos: Math.floor(Math.random() * 1000),
    data: "2024-12-15",
    estado: i % 2 === 0 ? "Aberto" : "Fechado",
  }));


  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Cabeçalho */}
      <Text className="text-2xl font-bold mb-4">Sorteio App !</Text>
   
      {/* Formulário de Busca */}
      <View className="flex-row items-center space-x-2 mb-4 gap-2">
      <ImageCarousel images={images} />
      </View>

    {/* Lista de Resultados */}
     <BannerPublicidade />
    <ListaResultados filteredResults={resultados} />
      
    </View>
  );
};

export default HomePage;
