
import TopMenu from "@/components/home/topMenu";
import CategoryList from "@/components/raflle/category";
import RaffleInfo from "@/components/raflle/info";
import { useAuth } from "@/context";
import { ICategoria } from "@/interfaces/ICategory";
import { IRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text,TouchableOpacity,ScrollView, ActivityIndicator } from "react-native";




const images = [
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
 "https://picsum.photos/800/600",
];


    
export default function  DetailsPage() {
  const { user} = useAuth();
  const { id } = useLocalSearchParams<{ id : string}>()
  const [ isLoading , setIsLoading ] = useState(false);
  const [avaliableRaffles , setAvaliableRaffles ] = useState<IRaffle>()
  
 const [ categoriesAvaliable, setCategoriesAvaliable ] = useState<string[]>([])
   const router = useRouter();

  const getAllRaffles = async ()=> {
    setIsLoading(true);
      try{
          const raffle = await api.get(`/raffles/${id}`,{
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
        //console.log(JSON.stringify(avaliableRaffles))
        getAvalibleCategories()
      }
  }

  const getAvalibleCategories = ()=>{
    const aval = avaliableRaffles?.categorias?.map(item => setCategoriesAvaliable([item?.nome]))
   
  }

  useEffect(()=>{
    getAllRaffles()
      .then(()=>{
        getAvalibleCategories()
      });
  },[])


  const raffleItens = Array.from({ length: 10 }, (_, i) => 'categoria');

  return (
<ScrollView className="flex-1 bg-white px-4 pt-12 pb-20"> 
    <TouchableOpacity onPress={()=>router.back()}>
    <Text>Voltar</Text>
      </TouchableOpacity>
    <TopMenu/>
    {isLoading ? <ActivityIndicator color='gray' size={35} /> : <>

  
    <RaffleInfo raffle={avaliableRaffles as IRaffle} /> 
    <CategoryList categories={categoriesAvaliable} onSelect={()=>alert('cento')}/>
    </>
    }
</ScrollView>

  );
};
