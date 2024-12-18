import { useAuth } from "@/context";
import { IRaffle } from "@/interfaces/IRaffles";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const RaffleInfo = ({ raffle }: { raffle: IRaffle}) => {
  const { user } = useAuth();
  return (
    <View className="p-4 bg-white rounded-lg  mb-4">    
      <Image
                source={{ uri:  raffle?.cover }}
                className="w-full h-52 rounded-md"
                resizeMode="cover"
                style={{ aspectRatio: 1 / 1 }}
              />
      <View className="flex-row items-start  my-4">
        <Text className="text-2xl font-bold text-gray-800 ml-2">{raffle?.nome}</Text>
      </View>

      <View className="flex-row items-center justify-between  mb-2">
      <View className="flex-row items-start  mb-2">
        <Ionicons name="calendar" size={24} color="gray" />
        <Text className="text-gray-600 ml-2">{new Date(raffle?.data_realizacao).toLocaleDateString()}</Text>
      </View>
      <View className="flex-row items-start  mb-4">
      <Ionicons
                  name={
                    raffle?.status as unknown as string === "corrente" ? "checkmark-circle" : "close-circle"
                  }
                  size={20}
                  color={raffle?.status as unknown as string === "corrente" ? "green" : "red"}
                />
                <Text
                  className={`text-sm font-medium ml-2 ${
                    raffle?.status as unknown as string === "corrente"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {raffle?.status as unknown as string}
                </Text>
      </View>
      </View>

      <View className="flex-row items-start justify-between ">
        <View>
        <Ionicons name="information-circle" size={24} color="gray" />
      <Text className="text-xl font-bold text-black ml-2">Descrição</Text>
        </View>
       {user?.id === raffle.organizadorId && <TouchableOpacity style={{backgroundColor:'darkblue', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20}}>
          <Text className="text-sm text-white">Editar</Text>
        </TouchableOpacity>}
      </View>
      
      <View>
      <Text className="text-gray-700 ml-2">{raffle?.politicas}</Text>
      </View>


    </View>
  );
};

export default RaffleInfo;
