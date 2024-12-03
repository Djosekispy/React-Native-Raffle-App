import { IRaffle } from "@/interfaces/IRaffles";
import { View, Text, Image } from "react-native";


const RaffleInfo = ({ raffle }: { raffle: IRaffle}) => {
  return (
    <View className="p-4 bg-white rounded-lg shadow-md mb-4">
      <Image source={{ uri: raffle?.cover }} className="w-full h-48 rounded-lg mb-4" resizeMode="cover" />
      <Text className="text-xl font-bold text-gray-800 mb-2">{raffle?.nome}</Text>
      <Text className="text-gray-600 mb-2">Data de Realização: {new Date(raffle?.data_realizacao).toLocaleDateString()}</Text>
      <Text className="text-gray-600 mb-4">Status: {raffle?.status as unknown as string}</Text>
      <Text className="text-gray-700">{raffle?.politicas}</Text>
    </View>
  );
};

export default RaffleInfo;
