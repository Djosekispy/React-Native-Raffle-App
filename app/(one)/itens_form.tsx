import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, ScrollView } from 'react-native';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocalSearchParams } from 'expo-router'; 
import { FormInput } from '@/components/loginForm/loginInput';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { api } from '@/utils/api';
import { isAxiosError } from 'axios';
import { useAuth } from '@/context';

interface IPropriedade {
  key: string;
  value: string;
}

interface ItemFormData {
  nome: string;
  descricao: string;
  propriedades?: {
    key: string;
    value: string;
  }[];
}

const itemSchema = yup.object().shape({
  nome: yup.string().required('O nome do item é obrigatório'),
  descricao: yup.string().required('A descrição do item é obrigatória'),
  propriedades: yup.array().of(
    yup.object().shape({
      key: yup.string().required('A chave da propriedade é obrigatória'),
      value: yup.string().required('O valor da propriedade é obrigatório'),
    })
  ).min(1, 'Adicione pelo menos uma propriedade'),
});

export default function AddItemToCategoria() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [categoriesAvaliable, setCategoriesAvaliable] = useState<{ id: number; title: string }[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const { sorteioId } = useLocalSearchParams<{ sorteioId: string }>();
  const router = useRouter();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ItemFormData>({
    resolver: yupResolver(itemSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      propriedades: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'propriedades',
  });

  useEffect(() => {
    const getAllRaffles = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/raffles', {
          headers: {
            Authorization: `Bearer ${user?.token_acesso}`,
          },
        });

        const raffles = response.data.result;
        const categoriesSet = new Map();

        raffles.forEach((raffle: any) => {
          raffle.categorias?.forEach((category: any) => {
            if (!categoriesSet.has(category.id)) {
              categoriesSet.set(category.id, {
                id: category.id,
                title: category.nome,
              });
            }
          });
        });

        const categoriesArray = [...categoriesSet.values()];
        setCategoriesAvaliable(categoriesArray);

        if (sorteioId) {
          const selectedCategory = categoriesArray.find(cat => cat.id === Number(sorteioId));
          if (selectedCategory) {
            setSelectedCategoria(selectedCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching raffles:', isAxiosError(error) ? error.response?.data?.message : error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllRaffles();
  }, [sorteioId]);

  const onSubmit = async (data: ItemFormData) => {
    if (!selectedCategoria) {
      Alert.alert('Erro', 'Selecione uma categoria antes de adicionar o item.');
      return;
    }

    setIsLoading(true);
    try {
      const formattedProperties = data.propriedades?.reduce<Record<string, string>>((acc, current) => {
        acc[current.key.trim()] = current.value;
        return acc;
      }, {});
      const payload = {
        nome : data.nome,
        descricao : data.descricao,
        propriedades : formattedProperties,
        categoriaId: selectedCategoria,
      };
      console.log(JSON.stringify(payload))

     const result = await api.post('/items', payload, {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });
      
      Alert.alert('Adição de Itens', result.data.message, [
        { text: 'Adicionar item', onPress: () => {} },
        { text: 'Ir ao Painel', onPress: () => router.push('/painel/') },
      ]);
    } catch (error) {
      
      if(isAxiosError(error)){
        Alert.alert('Erro ao adicionar item', error.response?.data.error, [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]);
      }else{
      Alert.alert('Erro ao adicionar item', 'Tente novamente mais tarde');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
    <View className="flex-1 bg-white px-6 py-8">
      <View className="mb-8 pt-4">
        <View className="flex-row justify-start gap-12 items-center">
          <Ionicons name="arrow-back" size={25} color="#000" onPress={() => router.back()} />
          <Text className="text-3xl font-bold text-gray-800 mb-2">Adicionar Item</Text>
        </View>
        <Text className="text-base text-gray-600">Escolha a categoria e adicione um novo item.</Text>
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 text-sm font-medium mb-2">Categorias Existentes</Text>
        <Picker
          selectedValue={selectedCategoria}
          onValueChange={(itemValue) => setSelectedCategoria(itemValue)}
          enabled={!sorteioId}
        >
          {categoriesAvaliable.map((categoria) => (
            <Picker.Item key={categoria.id} label={categoria.title} value={categoria.id} />
          ))}
        </Picker>
      </View>

      <View className="gap-4">
        <FormInput control={control} name="nome" placeholder="Nome do item" error={errors.nome?.message} icon="gift" />
        <FormInput control={control} name="descricao" placeholder="Descrição do item" error={errors.descricao?.message} icon="info-circle" />

        <Text className="text-gray-700 text-sm font-medium mb-2">Propriedades</Text>
        {fields.map((field, index) => (
  <View key={field.id} className="flex-row mb-4 items-center">
    {/* Input para a chave */}
    <Controller
      control={control}
      name={`propriedades.${index}.key`}
      render={({ field: { onChange, value } }) => (
        <TextInput
          placeholder="Chave da propriedade"
          value={value}
          onChangeText={onChange}
          className="border border-gray-300 rounded-lg p-2 mr-2 flex-1"
        />
      )}
    />
    {/* Input para o valor */}
    <Controller
      control={control}
      name={`propriedades.${index}.value`}
      render={({ field: { onChange, value } }) => (
        <TextInput
          placeholder="Valor da propriedade"
          value={value}
          onChangeText={onChange}
          className="border border-gray-300 rounded-lg p-2 mr-2 flex-1"
        />
      )}
    />
    {/* Botão de remover */}
    <TouchableOpacity onPress={() => remove(index)}>
      <FontAwesome name="trash-o" size={20} color="red" />
    </TouchableOpacity>
  </View>
))}


        <TouchableOpacity onPress={() => append({ key: '', value: '' })} className="bg-gray-300 py-2 px-4 rounded-lg mb-4">
          <Text className="text-center text-gray-700">Adicionar Propriedade</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className={`py-3 mt-6 rounded-lg ${isLoading ? 'bg-gray-400' : 'bg-blue-500'}`}
        >
          {isLoading ? <ActivityIndicator size={24} color="#fff" /> : <Text className="text-white text-center">Adicionar Item</Text>}
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}
