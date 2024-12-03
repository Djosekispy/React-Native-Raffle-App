import React from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const WelcomeMessage = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(500)}
      className="flex items-center justify-center py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg"
    >
      {/* Avatar */}
      <View className="mb-4">
        <Image
          source={{ uri: "https://picsum.photos/900/700" }}
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
      </View>

      {/* Título */}
      <Text className="text-2xl font-extrabold text-white text-center">
        Olá, <Text className="text-yellow-300">Usuário!</Text>
      </Text>

      {/* Descrição */}
      <Text className="text-gray-100 text-sm text-center px-6 mt-2">
        Explore novas campanhas, participe de sorteios e aproveite ao máximo sua experiência no <Text className="font-bold">Sorteio App</Text>!
      </Text>
    </Animated.View>
  );
};

export default WelcomeMessage;
