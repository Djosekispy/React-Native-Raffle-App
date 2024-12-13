import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocalSearchParams } from 'expo-router'; 
import { FormInput } from '@/components/loginForm/loginInput';
import { ICategoria } from '@/interfaces/ICategory';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

// Modelo para item (usando o IItens)
interface IItens {
  id?: number;
  nome: string;
  propriedades: object;
  descricao: string;
  categoriaId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IPropriedade {
  key: string;
  value: string;
}

// Schema de validação com Yup
const itemSchema = yup.object().shape({
  nome: yup.string().required('O nome do item é obrigatório'),
  descricao: yup.string().required('A descrição do item é obrigatória'),
  propriedades: yup.array().of(
    yup.object().shape({
      key: yup.string().required('A chave da propriedade é obrigatória'),
      value: yup.string().required('O valor da propriedade é obrigatório')
    })
  ).required()
});

interface ItemFormData {
  nome: string;
  descricao: string;
  propriedades: IPropriedade[];
}

export default function AddItemToCategoria() {
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<ICategoria | null>(null);
  const { sorteioId } = useLocalSearchParams<{ sorteioId : string}>(); // Obter o ID do sorteio
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ItemFormData>({
    resolver: yupResolver(itemSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      propriedades: [],
    },
  });

  useEffect(() => {
    // Carregar as categorias relacionadas ao sorteio
    const fetchCategorias = async () => {
      try {
        // Simulação de requisição para pegar as categorias
        const response = await fetch(`/api/categorias?sorteioId=${sorteioId}`);
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro ao carregar categorias', 'Tente novamente mais tarde');
      }
    };

    if (sorteioId) {
      fetchCategorias();
    }
  }, [sorteioId]);

  const onSubmit = async (data: ItemFormData) => {
    setIsLoading(true);
    try {
      // Adicionar novo item à categoria
      const response = await fetch(`/api/itens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          categoriaId: selectedCategoria?.id, // Associar ao categoria selecionada
        }),
      });

      const newItem = await response.json();
      Alert.alert('Item adicionado com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao adicionar item', 'Tente novamente mais tarde');
    } finally {
      setIsLoading(false);
    }
  };

  const addPropriedade = () => {
    const propriedades = control._formValues.propriedades || [];
    propriedades.push({ key: '', value: '' });
    setValue('propriedades', propriedades);
  };

  const removePropriedade = (index: number) => {
    const propriedades = control._formValues.propriedades || [];
    propriedades.splice(index, 1);
    setValue('propriedades', propriedades);
  };

  return (
    <View className="flex-1 bg-white px-6 py-8">
      {/* Cabeçalho */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800 mb-2">Adicionar Item à Categoria</Text>
        <Text className="text-base text-gray-600">Escolha a categoria e adicione um novo item.</Text>
      </View>

      {/* Selecione uma categoria */}
      <View className="mb-4">
        <Text className="text-gray-700 text-sm font-medium mb-2">Categorias Existentes</Text>
        <Picker
          selectedValue={selectedCategoria?.id}
          onValueChange={(itemValue) => {
            const categoria = categorias.find(c => c.id === itemValue);
            setSelectedCategoria(categoria || null);
          }}
        >
          {categorias.map((categoria) => (
            <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
          ))}
        </Picker>
      </View>

      {/* Formulário para adicionar um novo item */}
      <View>
        <Text className="text-gray-700 text-sm font-medium mb-2">Adicionar Novo Item</Text>

        <FormInput
          control={control}
          name="nome"
          placeholder="Nome do item"
          error={errors.nome?.message}
          icon={"gift"}
        />
        
        <FormInput
          control={control}
          name="descricao"
          placeholder="Descrição do item"
          error={errors.descricao?.message}
          icon={"info-circle"}
        />

        <Text className="text-gray-700 text-sm font-medium mb-2">Propriedades</Text>
        
        {/* Renderiza as propriedades */}
        {control._formValues.propriedades?.map((prop: IPropriedade, index: number) => (
          <View key={index} className="flex-row mb-4">
            <TextInput
              value={prop.key}
              onChangeText={(text) => {
                const propriedades = control._formValues.propriedades || [];
                propriedades[index].key = text;
                setValue('propriedades', [...propriedades]);
              }}
              placeholder="Chave da propriedade"
              className="border border-gray-300 rounded-lg p-2 mr-2"
            />
            <TextInput
              value={prop.value}
              onChangeText={(text) => {
                const propriedades = control._formValues.propriedades || [];
                propriedades[index].value = text;
                setValue('propriedades', [...propriedades]);
              }}
              placeholder="Valor da propriedade"
              className="border border-gray-300 rounded-lg p-2 mr-2"
            />
            <TouchableOpacity onPress={() => removePropriedade(index)} className="self-center">
              <FontAwesome name="trash-o" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Botão para adicionar nova propriedade */}
        <TouchableOpacity
          onPress={addPropriedade}
          className="bg-gray-300 py-2 px-4 rounded-lg mb-4"
        >
          <Text className="text-center text-gray-700">Adicionar Propriedade</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isLoading}
          className="bg-blue-500 py-3 mt-6 rounded-lg hover:bg-blue-600 active:bg-blue-700"
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">Adicionar Item</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
