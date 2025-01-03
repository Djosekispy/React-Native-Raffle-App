import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { Link, router, useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { api } from '@/utils/api';
import { useAuth } from '@/context';
import { isAxiosError } from 'axios';
import { IRaffle } from '@/interfaces/IRaffles';


const raffleSchema = yup.object().shape({
  nome: yup.string().required('O nome do sorteio é obrigatório'),
  cover: yup.string().url('URL inválida').optional(),
  data_realizacao: yup
    .date()
    .required('A data de realização é obrigatória'),
  politicas: yup.string().required('As políticas do sorteio são obrigatórias'),
});

interface RaffleFormData {
  nome: string;
  cover?: string;
  data_realizacao: Date;
  politicas: string;
}

export default function CreateRaffle() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();
  const [raffle, setRaffle] = useState<IRaffle | undefined>(undefined);
  const { id } = useLocalSearchParams<{id : string}>();
  const router = useRouter();
  const [coverImage, setCoverImage] = useState< DocumentPicker.DocumentPickerAsset>();
  const { control, handleSubmit, formState: { errors } } = useForm<RaffleFormData>({
    resolver: yupResolver(raffleSchema),
    defaultValues: {
      nome: '',
      cover: '',
      data_realizacao: new Date,
      politicas: '',
    },
  });

  const getRaffleData =  async () => {
    setIsLoading(true);
    try {
  const token = user?.token_acesso;
  const result = await api.get(`/raffles/${id}`, {
      headers: {
          Authorization : `Bearer ${token}`
      }
    });
    console.log(JSON.stringify(result.data.result))
    setRaffle(result.data.result)
    } catch (error) {
     if(isAxiosError(error)){
      console.log(JSON.stringify(error));
      Alert.alert('Erro ao criar sorteio', error.response?.data.error);
     }else{
      console.error(error);
      Alert.alert('Erro ao criar sorteio', 'Tente novamente mais tarde');
     }
    } finally {
      setIsLoading(false);
    }
  };
 


  const onSubmit = async (data: RaffleFormData) => {

    setIsLoading(true);
    try {
           
            const formData = new FormData();
            formData.append('nome', data.nome);
            formData.append('politicas', data.politicas);
            formData.append('data_realizacao', data.data_realizacao.toISOString());
           if(coverImage && coverImage.uri) {
            data.cover = coverImage.uri || '';
            formData.append('file', {
              uri: coverImage.uri,
              type: coverImage.mimeType,
              name: coverImage.name,
            } as unknown as Blob);
          }

            const token = user?.token_acesso;
            const result = await api.put(`/raffles/${id}`, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                    Authorization : `Bearer ${token}`
                }
              });
        router.push({pathname:'/painel/', params: {msg: 'Sorteio actualizado com sucesso!'}});
    } catch (error) {
     if(isAxiosError(error)){
      Alert.alert('Erro ao criar sorteio', error.response?.data.error);
     }else{
      Alert.alert('Erro ao criar sorteio', 'Tente novamente mais tarde');
     }
    } finally {
      setIsLoading(false);
    }
  };


  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type : 'image/*'
    });

    if (!result.canceled) {
        const imageData = result.assets[0]
      setCoverImage(imageData);
    }
  };

  useEffect(()=>{
    getRaffleData();
  },[])

  return (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      <View className="mb-8 pt-4">
      <View className='flex-row justify-start gap-12 items-center'>
            <Ionicons name='arrow-back' size={25} color={"#000"}  onPress={()=>router.back()}/>
        <Text className="text-3xl font-bold text-gray-800 mb-2">Editar Sorteio</Text>
             </View>
        <Text className="text-base text-gray-600">Preencha as informações abaixo para Editar seu sorteio.
        </Text>
      </View>

      <View className="space-y-4 gap-4 mb-12">
        <View>
          <Text className="text-gray-700 text-sm font-medium mb-2">Nome do Sorteio</Text>
          <FormInput
            control={control}
            name="nome"
            placeholder={raffle?.nome as string}
            error={errors.nome?.message}
            icon={''}
          />
        </View>
        <View>
          <Text className="text-gray-700 text-sm font-medium mb-2">Capa do Sorteio</Text>
          <TouchableOpacity onPress={pickImage} className="bg-gray-200 py-3 rounded-lg">
            <Text className="text-gray-700 text-center">Escolher Imagem</Text>
          </TouchableOpacity>
          {raffle?.cover && <Image source={{ uri: raffle?.cover ? raffle?.cover : coverImage?.uri  }} style={{ width: 100, height: 100, marginTop: 10 }} />}
        </View>
        <View>
          <Text className="text-gray-700 text-sm font-medium mb-2">Data de Realização</Text>
          <TouchableOpacity onPress={showDatepicker} className="border border-gray-300 p-3 rounded-lg">
            <Text className="text-gray-700">{ raffle?.data_realizacao ? String(raffle?.data_realizacao) : selectedDate.toLocaleDateString() }</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
              minimumDate={new Date(new Date().setDate(new Date().getDate() + 2))}
            />
          )}
          {errors.data_realizacao?.message && <Text className="text-red-500 text-sm">{errors.data_realizacao.message}</Text>}
        </View>

        <View>
          <Text className="text-gray-700 text-sm font-medium mb-2">Políticas do Sorteio</Text>
          <FormInput
            control={control}
            name="politicas"
            multiline={true}
            placeholder={raffle?.politicas as string}
            error={errors.politicas?.message}
            icon='info-circle'
          />
        </View>

        <TouchableOpacity
          disabled={isLoading}
          className="bg-blue-500 py-3 mt-6 rounded-lg hover:bg-blue-600 active:bg-blue-700"
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">Actualizar Sorteio</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
