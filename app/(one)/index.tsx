import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context";
import { IRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import RaffleInfo from "@/components/raflle/info";
import CategoryList from "@/components/raflle/category";
import { ICategoria } from "@/interfaces/ICategory";
import { IItens } from "@/interfaces/IItens";
import ItemDetail from "@/components/raflle/detail_itens";
import Comments from "@/components/raflle/comments";

export default function DetailsPage() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [selected, SetSelected]= useState<number>(1)
  const [isLoading, setIsLoading] = useState(false);
  const [raffle, setRaffle] = useState<IRaffle | null>(null);
  const [categories, setCategories] = useState([]);
  const [itens, setItens] = useState([]);
  const [editForm, setEditForm ] = useState<number>(1)

  const onSelect = (id : number)=>SetSelected(id)
  const onSubscribe = async(id : number)=>{
   
    try {
      const response = await api.post(`/raffles/${raffle?.id}/participate`,{ ItemId : id},{
        headers : {
          Authorization : `Bearer ${user?.token_acesso}`
        }
      })
      alert(response.data.message)
      await fetchRaffleDetails();
    } catch (error) {
      if(isAxiosError(error)){
        console.log(JSON.stringify(error.response?.data))
      }else{
        console.log(error)
      }
    }



  }
  const fetchRaffleDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/raffles/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });

      const fetchedRaffle = response.data.result;
      setRaffle(fetchedRaffle);
      const fetchedCategories = fetchedRaffle.categorias?.map((cat : ICategoria) => ({
        id: cat.id,
        nome: cat.nome,
      })) || [];
      setCategories(fetchedCategories);
      const fetchedItens = fetchedRaffle.categorias
      ?.flatMap((cat : ICategoria) =>
        cat.itens?.map((item : IItens) => ({
          category : cat.id,
          id: item.id,
          nome: item.nome,
          propriedades: item.propriedades,
          descricao: item.descricao,
          inscricoes : item.inscricoes
        }))
      ) || [];
    setItens(fetchedItens);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Erro na API:", error.response?.data?.message || "Erro desconhecido");
      } else {
        console.error("Erro inesperado:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRaffleDetails();
    }
  }, [id]);

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12 pb-20">
      <View className="flex-1 pb-12">
      <View className="flex-row items-center justify-start pb-4">
        <TouchableOpacity onPress={() => router.back()} className="ml-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-center flex-1">Detalhes do produto</Text>
        <View className="w-6" />
      </View>

      {isLoading ? (
        <ActivityIndicator color="gray" size={35} />
      ) : raffle ? (
        <>
          <RaffleInfo raffle={raffle} />
        </>
      ) : (
        <Text className="text-center text-gray-500 mt-10">
          Nenhum detalhe disponível para este sorteio.
        </Text>
      )}
{String(raffle?.status) === 'finalizado' &&  <TouchableOpacity 
  className="bg-[#FF7F50] text-white font-bold py-2 px-4 rounded"
  onPress={()=>router.push({pathname: '/(user)/winners', params: { sorteioId : raffle?.id}})}
  >
  <Text className="text-lg text-white font-bold text-center">Ver Vencedores do diferentes itens</Text>
</TouchableOpacity>
}
<View className='flex-row gap-4 justify-center items-center my-2'>
              <TouchableOpacity onPress={()=>setEditForm(1)} className={` p-2 rounded-md  ${editForm === 1 ? 'bg-[#FF7F50]' : 'bg-orange-200' }`}>
                <Text className='text-center'>Items em sorteio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setEditForm(2)} className={` p-2 rounded-md  ${editForm === 2 ? 'bg-[#FF7F50]' : 'bg-orange-200' }`}>
                <Text className='text-center'>Avaliações e Críticas</Text>
              </TouchableOpacity>
            </View>

    { editForm === 1 && <> 
   { categories && itens.length > 0 && itens.map((iten, index) => 
      (iten as any).category === selected && (
        <ItemDetail key={index} item={iten} owner={raffle?.organizadorId} onSubscribe={onSubscribe} />
      )
    )}
    <View className="mb-4">
{categories.length > 0 && (
            <CategoryList categories={categories} selected={selected}  onSelect={onSelect} />
          )}
</View> 
</>
    
    }

{ editForm === 2 &&  <Comments id={parseInt(String(id))} /> }


</View>
    </ScrollView>
  );
}
