import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { FormInput } from '@/components/loginForm/loginInput';
import { Ionicons } from '@expo/vector-icons';

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
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<ICategoria | null>(null);
  const { sorteioId } = useLocalSearchParams<{sorteioId : string}>(); 
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<CategoriaFormData>({
    resolver: yupResolver(categoriaSchema),
    defaultValues: {
      nome: '',
      descricao: '',
    },
  });

  const onSubmit = async (data: CategoriaFormData) => {
    setIsLoading(true);
    try {
      // Adicionar nova categoria ao sorteio
      Alert.alert('Categoria adicionada com sucesso!');
      router.push({pathname: '/(one)/itens_form', params: { id : '4'}})
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao adicionar categoria', 'Tente novamente mais tarde');
    } finally {
      setIsLoading(false);
    }
  };

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
