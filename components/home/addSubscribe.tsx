import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const AdsSubscribe = () => {
  return (
    <View className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden ">
      {/* Imagem de Fundo */}
      <Image
        source={{ uri:  "https://picsum.photos/600/400" }}
        className="w-full h-44"
        resizeMode="cover"
      />

      {/* Conteúdo do Banner */}
      <View className="absolute inset-0  bg-black/40 w-full h-full py-2 px-4 flex justify-center">
        <Text className="text-white text-xl font-bold mb-2">
          Inscreva-se nos Sorteios!
        </Text>
        <Text className="text-white text-sm mb-4">
          Explore novas oportunidades de sorteios personalizados e aumente sua visibilidade. Clique abaixo para se inscrever.
        </Text>

        {/* Botão de Criar Sorteio */}
        <TouchableOpacity className="bg-[#FF7F50] flex-row items-center py-2 px-4 rounded-lg mt-2">
          <Ionicons name="add-circle" size={20} color="white" />
          <Text className="text-white font-medium ml-2">Criar Sorteio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default AdsSubscribe;
