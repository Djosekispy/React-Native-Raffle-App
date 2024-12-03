import AdsSubscribe from "@/components/home/addSubscribe";
import ImageCarousel from "@/components/home/carrosel";
import CategoriesList from "@/components/home/categories";
import ListaResultados from "@/components/home/itensrsult";
import BannerPublicidade from "@/components/home/publicity";
import { ItensSorteio,ItemProps } from "@/components/home/raffleItens";
import TopMenu from "@/components/home/topMenu";
import WelcomeMessage from "@/components/Menu/animatedtop";
import ProfileHeader from "@/components/userPage/ProfileHeader";
import { useAuth } from "@/context";
import { IRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, ActivityIndicator } from "react-native";




const images = [
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
 "https://picsum.photos/800/600",
];


    
const HomePage = () => {
  const { user} = useAuth();
  const [ isLoading , setIsLoading ] = useState(false);
  const [avaliableRaffles , setAvaliableRaffles ] = useState<IRaffle[]>([])

  // Mock de resultados
  const resultados = Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    title: `Sorteio ${i + 1}`
  }));

  const getAllRaffles = async ()=> {
    setIsLoading(true);
      try{
          const raffle = await api.get('/raffles',{
              headers : {
                Authorization : `Bearer ${user?.token_acesso}`
              }
          })
          setAvaliableRaffles(raffle.data.result)
      }catch(error){
          if(isAxiosError(error)){
            console.log(error.response?.data.message)
          }else{
            console.log("Erro inesperado : " + error)
          }
      }finally{
        setIsLoading(false)
      }
  }


  useEffect(()=>{
    getAllRaffles();
  },[])


  const raffleItens = Array.from({ length: 10 }, (_, i) => 'categoria');

  return (
<ScrollView className="flex-1 bg-white px-4 pt-12 pb-20"> 

<TopMenu/>

 

  <View className="flex-row items-center space-x-2 mb-4 gap-2">
    <ImageCarousel images={images} />
  </View>


<CategoriesList categories={raffleItens}  onPress={()=>setIsLoading(false)}/>


  <Text className="text-2xl font-bold py-4">Campanhas em Destaque</Text>
  {isLoading ? (
    <ActivityIndicator size={35} color="gray" />
  ) : (
    <ListaResultados filteredResults={avaliableRaffles} />
  )}

  <AdsSubscribe />
  <Text className="text-2xl font-bold py-4">Perto de Si</Text>
  {isLoading ? (
    <ActivityIndicator size={35} color="gray" />
  ) : (
    <ListaResultados filteredResults={avaliableRaffles} />
  )}

  <BannerPublicidade />
  <ItensSorteio items={resultados} />
</ScrollView>

  );
};

export default HomePage;
