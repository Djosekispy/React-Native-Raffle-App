import { useAuth } from "@/context";
import { IRaffle,StatusRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";


function formatarData(data : string) {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("data"); 
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avaliableRaffles, setAvaliableRaffles] = useState<IRaffle[]>([]);
  const [categoriesAvaliable, setCategoriesAvaliable] = useState<{ id: number; title: string }[]>([]);
  const [images, setImages] = useState<string[]>([]);
  
  const router = useRouter();

  const goToDetails = (id : number) => {
    router.push({pathname: '/(one)/', params: {id}});
  };

  const searchRaffles = async (text: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/raffles/search/${text}`, {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });
      const raffles = response.data.result;
      setAvaliableRaffles(raffles);

      const categoriesSet = new Map();
      const imageList: string[] = [];

      raffles.forEach((raffle : any) => {
        if (raffle.cover) {
          imageList.push(raffle.cover);
        }

        raffle.categorias?.forEach((category : any) => {
          if (!categoriesSet.has(category.id)) {
            categoriesSet.set(category.id, {
              id: category.id,
              title: category.nome,
            });
          }
        });
      });

      setImages(imageList);
      setCategoriesAvaliable([...categoriesSet.values()]);
    } catch (error) {
   if(isAxiosError(error)){
    console.error('Error fetching raffles:', error.response?.data?.message);
   }else{
    console.error(error);
   }
    } finally {
      setIsLoading(false);
    }
  };


  const handleFilterSelect = (filter : any) => {
    setSelectedFilter(filter);
  };



  const filteredResults = avaliableRaffles.filter((item) =>
    selectedFilter === "Todas"
      ? true
      : item.categorias?.some((categoria) => categoria.nome === selectedFilter)
  );
  

  return (
    <View className="flex-1 bg-white px-4 pt-12">

      <Text className="text-xl font-bold mb-4">Buscar Sorteios</Text>

      <View className="flex-row items-center space-x-2 mb-4 gap-2">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Digite o nome do sorteio"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
       {isLoading ? <ActivityIndicator size={24} color={'white'}/> : <TouchableOpacity disabled={!searchQuery} className="bg-blue-500 rounded-lg px-4 py-2" onPress={()=>searchRaffles(searchQuery)}>
          <Text className="text-white font-medium">Buscar</Text>
        </TouchableOpacity>}
      </View>

      <View className="flex-row space-x-2 mb-4">
        {categoriesAvaliable.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleFilterSelect(category.title)}
            className={`px-4 py-2 rounded-lg mx-2 ${
              selectedFilter === category.title
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <Text
              className={`font-medium ${
                selectedFilter === category.title ? "text-white" : "text-gray-800"
              }`}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

     
<FlatList
  showsVerticalScrollIndicator={false}
  data={filteredResults}
  keyExtractor={(item) => String(item.id)}
  numColumns={2} 
  columnWrapperStyle={{
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  }}
  renderItem={({ item }) => (
    <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4 w-[48%]">
      <View className="relative">
        <Image
          source={{ uri: item.cover }}
          className="w-full h-44"
          resizeMode="cover"
          style={{ aspectRatio: 1 / 1 }}
        />

        <View
          className="absolute top-2 right-2 bg-black text-white text-xs font-medium py-1 px-2 rounded flex-row items-center"
        >
          <Ionicons name="ticket" size={12} color="white" />
          <Text className="ml-1 text-white">{item.categorias?.length}</Text>
        </View>
      </View>

      {/* Conteúdo */}
      <View className="p-4">
        <TouchableOpacity
         onPress={() => goToDetails(parseInt(String(item.id)))}
        >
        <Text   numberOfLines={1} className="text-lg font-bold mb-2">{item.nome}</Text>
        </TouchableOpacity>
        <View className="flex-row items-center mb-1">
          <Ionicons name="calendar" size={20} color="gray" />
          <Text className="text-sm text-gray-600 ml-2 font-medium">
            {formatarData(String(item.data_realizacao))}
            </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons
            name={item.status === StatusRaffle.now ? 'checkmark-circle' : 'close-circle'}
            size={20}
            color={item.status === StatusRaffle.now ? 'green' : 'red'}
          />
          <Text
            className={`text-sm font-medium ml-2 ${
              item.status === StatusRaffle.now ? 'text-green-500' : 'text-red-500'
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

export default RaffleSearchView;
