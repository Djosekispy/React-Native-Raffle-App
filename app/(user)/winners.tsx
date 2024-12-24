import { useAuth } from "@/context";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";




export default function Winners () {
   const { sorteioId } = useLocalSearchParams<{ sorteioId : string}>()
  const { user } = useAuth();
  const router = useRouter()    
   const getWinners = async()=>{
    try {
        const result = api.get(`/raffles/${sorteioId}/winners`,{
            headers:{
                Authorization : `Bearer ${user?.token_acesso}`
            }
        })
        console.log(JSON.stringify((await result).data))
    } catch (error) {
        if(isAxiosError(error)){
            alert(error.response?.data.message)
            console.log(JSON.stringify(error.response?.data))
            router.back();
        }else{
            console.log(error)
        }
    }
   }

   useEffect(()=>{
    getWinners();
   },[])

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-xl font-bold">Vencedores</Text>
        </View>
    )
}