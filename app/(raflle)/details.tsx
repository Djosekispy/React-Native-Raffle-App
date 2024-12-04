import AdsSubscribe from "@/components/home/addSubscribe";
import ImageCarousel from "@/components/home/carrosel";
import CategoriesList from "@/components/home/categories";
import ListaResultados from "@/components/home/itensrsult";
import BannerPublicidade from "@/components/home/publicity";
import { ItensSorteio,ItemProps } from "@/components/home/raffleItens";
import TopMenu from "@/components/home/topMenu";
import WelcomeMessage from "@/components/Menu/animatedtop";
import RaffleInfo from "@/components/raflle/info";
import ProfileHeader from "@/components/userPage/ProfileHeader";
import { useAuth } from "@/context";
import { IRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, ActivityIndicator } from "react-native";




const images = [
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
 "https://picsum.photos/800/600",
];


    
const DetailsPage = () => {
  const { user} = useAuth();
  const { id } = useLocalSearchParams<{ id : string}>()
  const [ isLoading , setIsLoading ] = useState(false);
  const [avaliableRaffles , setAvaliableRaffles ] = useState<IRaffle>()


  const getAllRaffles = async ()=> {
    setIsLoading(true);
      try{
          const raffle = await api.get(`/raffles/${id}`,{
              headers : {
                Authorization : `Bearer ${user?.token_acesso}`
              }
          })
         console.log(JSON.stringify(raffle.data))
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

{isLoading ? <ActivityIndicator color='gray' size={35} /> : <RaffleInfo raffle={avaliableRaffles as IRaffle} /> 
}
</ScrollView>

  );
};

export default DetailsPage;
