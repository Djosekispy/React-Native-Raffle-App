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
import { ICategoria } from "@/interfaces/ICategory";
import { IRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, ActivityIndicator } from "react-native";




const images = [
  "https://picsum.photos/800/600",
];


    
const HomePage = () => {
  const { user} = useAuth();
  const [ isLoading , setIsLoading ] = useState(false);
  const [avaliableRaffles , setAvaliableRaffles ] = useState<IRaffle[]>([])
 const [ categoriesAvaliable, setCategoriesAvaliable ] = useState<{id : number , title : string}[]>([])
const router = useRouter();
 const itens = Array.from({length: 10},(_,index)=>{
  return {
    id : index,
    title : 'item' + index
  }
 })
  // Mock de resultados

  const coverFromRaffles = ()=>{
    avaliableRaffles.map(item => images.push(item?.cover as string))
  }

  const categoryFromRaffles = ()=>{
    const aval =  avaliableRaffles.map(item =>  (item.categorias as any)?.length > 0 && item.categorias?.map(value => setCategoriesAvaliable([{id : value.id, title : value.nome}])))
    }


    const goToDetails = (id: number) => {
      router.push({ pathname: '/(one)/', params: { id } });
    };
  
  const getAllRaffles = async ()=> {
    setIsLoading(true);
      try{
          const raffle = await api.get('/raffles',{
              headers : {
                Authorization : `Bearer ${user?.token_acesso}`
              }
          })

        //  console.log('Resultados',JSON.stringify(raffle.data.result))
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
    getAllRaffles()
      .then(()=>{
        coverFromRaffles();
        categoryFromRaffles();
    });
  },[])


  const raffleItens = Array.from({ length: 10 }, (_, i) => 'categoria');

  return (
<ScrollView className="flex-1 bg-white px-4 pt-12 pb-20"> 

<TopMenu/>

 

  <View className="flex-row items-center space-x-2 mb-4 gap-2">
    <ImageCarousel images={images} />
  </View>


<CategoriesList categories={categoriesAvaliable}  onPress={()=>setIsLoading(false)}/>


  {isLoading ? (
    <ActivityIndicator size={35} color="gray" />
  ) : (
    <ListaResultados filteredResults={avaliableRaffles} label="Campanhas em Destaque" goToDetails={goToDetails}/>
  )}

  <AdsSubscribe />
  {isLoading ? (
    <ActivityIndicator size={35} color="gray" />
  ) : (
    <ListaResultados filteredResults={avaliableRaffles} label="Perto de Si" goToDetails={goToDetails}/>
  )}

  <BannerPublicidade />
  <ItensSorteio items={itens} />
</ScrollView>

  );
};

export default HomePage;
