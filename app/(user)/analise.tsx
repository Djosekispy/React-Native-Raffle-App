
import { User } from "@/interfaces/user";
import { api, apiAmin } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, Linking } from "react-native";

const UserProfileView = () => {
  const [isImageModalVisible, setImageModalVisible] = useState(false);
 const [ usuario, setUsuario ] = useState<User>();
 const router = useRouter()
 const {  usuarioId, itemId } = useLocalSearchParams();
  const openDocument = (documentUrl: string | undefined) => {
    if (documentUrl) {
      Linking.openURL(documentUrl).catch(() =>
        alert("Não foi possível abrir o documento. Verifique o link.")
      );
    } else {
      alert("Nenhum documento disponível.");
    }
  };

  const getUserData = async ()=>{
    try {
        const response = await apiAmin.get(`users/${usuarioId}`);
        setUsuario(response.data)
    console.log(JSON.stringify(response.data))
    } catch (error) {
        if(isAxiosError(error)){
            console.log(JSON.stringify(error.response?.data))
        }else{
            console.log(error)
        }
    }
  }

  useEffect(()=>{
    getUserData();
  },[])

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* User Profile Section */}

      <View className='p-4 mt-4 flex-row justify-evenly items-center'>
        <Ionicons name='arrow-back' size={25} color={"#000"}  onPress={()=>router.back()}/>
        <Text className='font-bold text-2xl text-black px-12 text-center my-4  py-2 rounded-2xl'>Avaliar candidato</Text>
      </View>
      <View className="bg-white p-4 rounded-lg shadow-md my-4">
        {/* Profile Image */}

        <TouchableOpacity onPress={() => setImageModalVisible(true)}>
          <Image
            source={{
              uri: usuario?.foto_perfil
                ? usuario.foto_perfil
                : "https://via.placeholder.com/150", // Placeholder se não houver imagem
            }}
            className="h-24 w-24 rounded-full self-center"
          />
        </TouchableOpacity>

        {/* User Details */}
        <Text className="text-xl font-bold text-center mt-4">{usuario?.nome_completo}</Text>
        <Text className="text-sm text-center text-gray-600">{usuario?.email}</Text>
        <Text className="text-sm text-center text-gray-600">{usuario?.telefone}</Text>
        {usuario?.endereco && (
          <Text className="text-sm text-center text-gray-600">{usuario.endereco}</Text>
        )}
        {usuario?.data_nascimento && (
          <Text className="text-sm text-center text-gray-600">
            Nascimento: {new Date(usuario.data_nascimento).toLocaleDateString()}
          </Text>
        )}
        {usuario?.numero_bilhete && (
          <Text className="text-sm text-center text-gray-600">
            Nº Bilhete: {usuario.numero_bilhete}
          </Text>
        )}
      </View>

      {/* Document Section */}
   

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-6">
        <TouchableOpacity className="bg-green-600 py-3 px-4 rounded flex-1 mr-2">
          <Text className="text-center text-white font-bold">Aprovar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-600 py-3 px-4 rounded flex-1 ml-2">
          <Text className="text-center text-white font-bold">Reprovar</Text>
        </TouchableOpacity>
      </View>

      {/* Image Modal */}
      <Modal visible={isImageModalVisible} transparent={true} animationType="fade">
        <View className="flex-1 bg-black bg-opacity-75 justify-center items-center">
          <TouchableOpacity
            onPress={() => setImageModalVisible(false)}
            className="absolute top-4 right-4 z-10"
          >
            <Text className="text-white text-lg">Fechar</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: usuario?.foto_perfil
                ? usuario.foto_perfil
                : "https://via.placeholder.com/150",
            }}
            className="h-96 w-96 rounded-lg"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default UserProfileView;
