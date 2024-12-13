import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { Link, router, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';


const raffleSchema = yup.object().shape({
  nome: yup.string().required('O nome do sorteio é obrigatório'),
  cover: yup.string().url('URL inválida').optional(),
  data_realizacao: yup
    .date()
    .required('A data de realização é obrigatória')
    .min(new Date(), 'A data deve ser futura'),
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
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<ImagePicker.ImagePickerAsset>();
  const { control, handleSubmit, formState: { errors } } = useForm<RaffleFormData>({
    resolver: yupResolver(raffleSchema),
    defaultValues: {
      nome: '',
      cover: '',
      data_realizacao: new Date,
      politicas: '',
    },
  });

  const onSubmit = async (data: RaffleFormData) => {
    setIsLoading(true);
    try {
      // Simulação de envio
      console.log(data);
      Alert.alert('Sorteio criado com sucesso!');
      router.push({pathname:'/(one)/category_form', params: {sorteioId : '2'}});
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao criar sorteio', 'Tente novamente mais tarde');
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        const imageData = result.assets[0]
      setCoverImage(imageData);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-8">
      {/* Cabeçalho */}
      <View className="mb-8 pt-4">
      <View className='flex-row justify-start gap-12 items-center'>
            <Ionicons name='arrow-back' size={25} color={"#000"}  onPress={()=>router.back()}/>
        <Text className="text-3xl font-bold text-gray-800 mb-2">Criar Novo Sorteio</Text>
             </View>
        <Text className="text-base text-gray-600">Preencha as informações abaixo para criar um novo sorteio.</Text>
      </View>

      {/* Formulário */}
      <View className="space-y-4">
        {/* Nome */}
        <View>
          <Text className="text-gray-700 text-sm font-medium mb-2">Nome do Sorteio</Text>
          <FormInput
            control={control}
            name="nome"
            placeholder="Digite o nome do sorteio"
            error={errors.nome?.message}
            icon={''}
          />
        </View>

        {/* URL da Capa */}
        <View>
          <Text className="text-gray-700 text-sm font-medium mb-2">Capa do Sorteio</Text>
          <TouchableOpacity onPress={pickImage} className="bg-gray-200 py-3 rounded-lg">
            <Text className="text-gray-700 text-center">Escolher Imagem</Text>
          </TouchableOpacity>
          {coverImage && <Image source={{ uri: coverImage.uri }} style={{ width: 100, height: 100, marginTop: 10 }} />}
        </View>

        {/* Data de Realização */}
        <View>
          <Text className="text-gray-700 text-sm font-medium mb-2">Data de Realização</Text>
          <TouchableOpacity onPress={showDatepicker} className="border border-gray-300 p-3 rounded-lg">
            <Text className="text-gray-700">{selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          {errors.data_realizacao?.message && <Text className="text-red-500 text-sm">{errors.data_realizacao.message}</Text>}
        </View>

        {/* Políticas */}
        <View>
          <Text className="text-gray-700 text-sm font-medium mb-2">Políticas do Sorteio</Text>
          <FormInput
            control={control}
            name="politicas"
            placeholder="Descreva as políticas do sorteio"
            error={errors.politicas?.message}
            icon='info-circle'
          />
        </View>

        {/* Botão de envio */}
        <TouchableOpacity
          disabled={isLoading}
          className="bg-blue-500 py-3 mt-6 rounded-lg hover:bg-blue-600 active:bg-blue-700"
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">Criar Sorteio</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
