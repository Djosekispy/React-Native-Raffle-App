import AdsSubscribe from "@/components/home/addSubscribe";
import ImageCarousel from "@/components/home/carrosel";
import ListaResultados from "@/components/home/itensrsult";
import BannerPublicidade from "@/components/home/publicity";
import { ItensSorteio,ItemProps } from "@/components/home/raffleItens";
import WelcomeMessage from "@/components/Menu/animatedtop";
import ProfileHeader from "@/components/userPage/ProfileHeader";
import { useAuth } from "@/context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";




const images = [
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
 "https://picsum.photos/800/600",
];

    
const HomePage = () => {
  const { user} = useAuth();

  // Mock de resultados
  const resultados = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Sorteio ${i + 1}`,
    image:  "https://picsum.photos/700/500",
    category: `Categoria ${i % 5 + 1}`,
    inscritos: Math.floor(Math.random() * 1000),
    data: "2024-12-15",
    estado: i % 2 === 0 ? "Aberto" : "Fechado",
  }));

  const raffleItens = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    image:  "https://picsum.photos/900/700",
    title: "iPhone 14",
    description: "O mais novo modelo da Apple. Participe do sorteio agora!",
    inscritos: 123,
  }));

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      {/* Cabeçalho */}
      <View className="flex flex-col items-center justify-center py-4">
        <Text className="text-2xl font-bold mb-4">Seja Bem-vindo à Sorteio App !</Text>
        <Text>Explore as oportunidades de sorteio e aumente suas chances de ganhar.</Text>
      </View>
   <WelcomeMessage />
      {/* Formulário de Busca */}
      <View className="flex-row items-center space-x-2 mb-4 gap-2">
      <ImageCarousel images={images} />
      </View>
      <ItensSorteio items={raffleItens} />
    {/* Lista de Resultados */}
   
     <BannerPublicidade />

     <Text className="text-2xl font-bold py-4"> Campanhas em Destaques</Text>
    <ListaResultados filteredResults={resultados} />
    <AdsSubscribe/>
    <Text className="text-2xl font-bold py-4">Perto de Si</Text>
    <ListaResultados filteredResults={resultados} />
    
    </ScrollView>
  );
};

export default HomePage;
