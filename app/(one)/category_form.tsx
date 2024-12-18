import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { FormInput } from '@/components/loginForm/loginInput';
import { Ionicons } from '@expo/vector-icons';
import { IRaffle } from '@/interfaces/IRaffles';
import { api } from '@/utils/api';
import { useAuth } from '@/context';
import { isAxiosError } from 'axios';
import { Picker } from '@react-native-picker/picker';

// Modelo para categoria (usando o ICategoria)
interface ICategoria {
  id: number;
  nome: string;
  descricao: string;
  sorteioId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema de validação com Yup
const categoriaSchema = yup.object().shape({
  nome: yup.string().required('O nome da categoria é obrigatório'),
  descricao: yup.string().required('A descrição da categoria é obrigatória'),
});

interface CategoriaFormData {
  nome: string;
  descricao: string;
}

export default function AddCategoriaToRaffle() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{id : string}>();
  const [selectedRaffle, setSelectedRaffle] = useState<IRaffle | null>(null);
  const { sorteioId } = useLocalSearchParams<{sorteioId : string}>(); 
  const router = useRouter();
  const [raffles, setRaffles] = useState<IRaffle[]>([]);
  const { control, handleSubmit, formState: { errors } } = useForm<CategoriaFormData>({
    resolver: yupResolver(categoriaSchema),
    defaultValues: {
      nome: '',
      descricao: '',
    },
  });
 


  const getAllRaffles = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/raffles/users/yours', {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });
      const raffles = response.data.result;

      // Update raffles
      setRaffles(raffles);
  } catch (error) {
    if(isAxiosError(error)){
      console.error('Error fetching raffles:', error.response?.data?.message);
     }else{
      console.error(error);
     }
      } finally {
        setIsLoading(false);
}
}

  const onSubmit = async (data: CategoriaFormData) => {
    setIsLoading(true);
    try {
      const data_to_send = {
        nome : data.nome,
        descricao : data.descricao,
        sorteioId : id || selectedRaffle?.id
      }
      const response = await api.post('/categories',data_to_send, {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });
      Alert.alert('Adição de Categoria', 'Categoria adicionada com sucesso!', [
        { text: 'Adicionar item', onPress: () => router.push('/(one)/itens_form') },
        { text: 'Adicionar Categoria', onPress: () => router.push('/(one)/category_form') },
      ]);
      //router.push({pathname: '/(one)/itens_form', params: { id : '4', status : 'ok'}})
    } catch (error) {
      
      if(isAxiosError(error)){
        Alert.alert('Erro ao adicionar categoria', error.response?.data.error, [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]);
      }else{
      Alert.alert('Erro ao adicionar categoria', 'Tente novamente mais tarde');
      }
    } finally {
      setIsLoading(false);
    }
  };

 useEffect(()=>{
  if(!id){
    getAllRaffles();
  }
 },[])
  return (
    <View className="flex-1 bg-white px-6 py-8">
      {/* Cabeçalho */}
      <View className="mb-8 pt-4">
      <View className='flex-row justify-start gap-12 items-center'>
            <Ionicons name='arrow-back' size={25} color={"#000"}  onPress={()=>router.back()}/>
            <Text className="text-3xl font-bold text-gray-800 mb-2">Adicionar Categoria</Text>
             </View>
        <Text className="text-base text-gray-600">crie e edite uma nova categoria para o sorteio.</Text>
      </View>


      <View className="mb-4">
        <Text className="text-gray-700 text-sm font-medium mb-2">Sorteios disponivéis</Text>
      { id ?  <Picker
          selectedValue={id}
          enabled={false}
        >
          {raffles.map((raf) => (
            raf.id === Number(id) ? <Picker.Item key={raf.id} label={raf.nome} value={raf.id} /> : null
          ))}
        </Picker>
        :
        <Picker
          selectedValue={selectedRaffle?.id}
          onValueChange={(itemValue) => {
            const raf = raffles.find(c => c.id === itemValue);
            setSelectedRaffle(raf || null);
          }}
        >
          {raffles.map((raf) => (
            <Picker.Item key={raf.id} label={raf.nome} value={raf.id} />
          ))}
        </Picker>}
      </View>

      {/* Formulário para adicionar nova categoria */}
      <View className='gap-4'>
        <Text className="text-gray-700 text-sm font-medium mb-2">Adicionar Nova Categoria</Text>

        <FormInput
          control={control}
          name="nome"
          placeholder="Nome da categoria"
          error={errors.nome?.message}
          icon='tag'
        />
        
        <FormInput
          control={control}
          name="descricao"
          placeholder="Descrição da categoria"
          error={errors.descricao?.message}
          icon='info-circle'
        />
        
        <TouchableOpacity
          disabled={isLoading}
          className="bg-blue-500 py-3 mt-6 rounded-lg hover:bg-blue-600 active:bg-blue-700"
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">Adicionar Categoria</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
