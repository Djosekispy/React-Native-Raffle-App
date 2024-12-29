import ProfileHeader from '@/components/userPage/ProfileHeader';
import UserInfo from '@/components/userPage/UserInfo';
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { User } from '@/interfaces/user';
import { schemaUser } from '@/interfaces/user';
import { UserSchema } from '@/interfaces/user';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { api } from '@/utils/api';
import { isAxiosError } from 'axios';

const EditProfileScreen = () => {
    const { user, updateUser } = useAuth();
    const [isError, setIsError] = useState('');
    const [editForm, setEditForm ] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState({
        licenca: null,
        nif: null,
        bilhete: null,
    });
    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm<UserSchema>({
        defaultValues: { ...user },
        resolver: yupResolver(schemaUser),
    });

    const onSubmitPersonalData = async (data: UserSchema) => {
        setIsLoading(true);
        try {
            const user = await updateUser(data);
            if ('error' in user) {
                setIsError(user.error);
            } else {
                router.replace({ pathname: '/(user)/profile', params: { success: 'Dados atualizados com sucesso!' } });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (field: keyof typeof uploadedDocs) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
            if (!result.canceled) {
                setUploadedDocs({ ...uploadedDocs, [field]: result.assets[0] });
            }
        } catch (error) {
            Alert.alert('Erro ao carregar o documento', error as string);
        }
    };

    const onSubmitDocuments = async () => {
      setIsUploading(true);
      const formData = new FormData();
    
      if (uploadedDocs.licenca) formData.append('licenca', uploadedDocs.licenca);
      if (uploadedDocs.nif) formData.append('nif', uploadedDocs.nif);
      if (uploadedDocs.bilhete) formData.append('bilheteUrl', uploadedDocs.bilhete);
    
      // Inspeciona o conteúdo do FormData
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    
      try {
        const response = await api.post('/user/document', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token_acesso}`,
          },
        });
        console.log(response.data); 
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(JSON.stringify(error.response?.data)); 
          Alert.alert('Erro', error.response?.data?.error || 'Erro desconhecido.');
        } else {
          console.error(error);
          Alert.alert('Erro', 'Ocorreu um problema ao enviar os documentos.');
        }
      } finally {
        setIsUploading(false);
      }
    };
    

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} alwaysBounceVertical>
            <View className="p-4 mt-4 flex-row justify-evenly items-center">
                <Ionicons name="arrow-back" size={25} color="#000" onPress={() => router.back()} />
                <Text className="font-bold text-2xl text-black px-12 text-center my-4 py-2 rounded-2xl">
                    Atualizar dados pessoais
                </Text>
            </View>

            <ProfileHeader email={user?.email} name={user?.nome_completo} image={user?.foto_perfil} />

            <View className='flex-row gap-4 justify-center items-center my-2'>
              <TouchableOpacity onPress={()=>setEditForm(1)} className={` p-2 rounded-md  ${editForm === 1 ? 'bg-[#FF7F50]' : 'bg-orange-200' }`}>
                <Text className='text-center'>Dados Pessoais</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setEditForm(2)} className={` p-2 rounded-md  ${editForm === 2 ? 'bg-[#FF7F50]' : 'bg-orange-200' }`}>
                <Text className='text-center'>Documentos de Identificação</Text>
              </TouchableOpacity>
            </View>

            {/* Seção de Dados Pessoais   */}
         { editForm === 1  &&  <View className="flex-1 mx-4">
               
                <View className="my-4">
                    {isError && (
                        <View className="bg-red-100 border border-red-400 rounded-md p-3 mb-4">
                            <Text className="text-red-700 font-medium">{isError}</Text>
                        </View>
                    )}

<View>
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Nome Completo
          </Text>
       
             <FormInput
              control={control}
              name="nome_completo"
              icon="user-o"
              error={errors.nome_completo?.message}
              placeholder="Seu nome completo"
            />
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Email
          </Text>
       
             <FormInput
              control={control}
              name="email"
              icon="envelope-o"
              error={errors.email?.message}
              placeholder="Seu email"
            />
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Telefone
          </Text>
       
             <FormInput
              control={control}
              name="telefone"
              icon="phone"
              error={errors.telefone?.message}
              placeholder="Seu telefone"
            />
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Endereço
          </Text>
       
             <FormInput
              control={control}
              name="endereco"
              icon="map-pin"
              error={errors.endereco?.message}
              placeholder="Seu endereço"
            />
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Data de Nascimento
          </Text>
       
             <FormInput
              control={control}
              name="data_nascimento"
              icon="calendar"
              error={errors.data_nascimento?.message}
              placeholder="Sua data de nascimento"
            />
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Número de Bilhete de Identidade
          </Text>
       
             <FormInput
              control={control}
              name="numero_bilhete"
              icon="id-card"
              error={errors.numero_bilhete?.message}
              placeholder="Seu número de bilhete de identidade"
            />
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Gênero
          </Text>
       
             <FormInput
              control={control}
              name="sexo"
              icon="venus-mars"
              error={errors.sexo?.message}
              placeholder="Seu gênero"
            />
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Estado Civil
          </Text>
       
             <FormInput
              control={control}
              name="estado_civil"
              icon="heart"
              error={errors.estado_civil?.message}
              placeholder="Seu estado civil"
            />
                </View>
                    {/* Outros campos de formulário */}

                    <TouchableOpacity
                        disabled={isLoading}
                        className="bg-[#FF7F50] py-3 mt-4 rounded-lg"
                        onPress={handleSubmit(onSubmitPersonalData)}
                    >
                        {isLoading ? <ActivityIndicator size={30} color="#fff" /> : <Text className="text-white text-center font-semibold text-xl">Salvar</Text>}
                    </TouchableOpacity>
                </View>
            </View>}

            {/* Seção de Documentos */}
            { editForm === 2  && 
            <View className="flex-1 mx-4 mt-8">
                <Text className="font-bold text-lg text-black mb-4">Envio de Documentos</Text>

                <TouchableOpacity className="bg-gray-200 py-3 px-4 rounded-lg mb-4" onPress={() => handleFileUpload('licenca')}>
                    <Text className="text-gray-700">{uploadedDocs.licenca ? `Licença: ${(uploadedDocs.licenca as DocumentPicker.DocumentPickerAsset).name}` : 'Carregar Licença'}</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-gray-200 py-3 px-4 rounded-lg mb-4" onPress={() => handleFileUpload('nif')}>
                    <Text className="text-gray-700">{uploadedDocs.nif ? `NIF: ${(uploadedDocs.nif as  DocumentPicker.DocumentPickerAsset).name}` : 'Carregar NIF'}</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-gray-200 py-3 px-4 rounded-lg mb-4" onPress={() => handleFileUpload('bilhete')}>
                    <Text className="text-gray-700">{uploadedDocs.bilhete ? `Bilhete: ${(uploadedDocs.bilhete as DocumentPicker.DocumentPickerAsset).name}` : 'Carregar Bilhete'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={isUploading}
                    className="bg-[#FF7F50] py-3 mt-4 rounded-lg"
                    onPress={onSubmitDocuments}
                >
                    {isUploading ? <ActivityIndicator size={30} color="#fff" /> : <Text className="text-white text-center font-semibold text-xl">Enviar Documentos</Text>}
                </TouchableOpacity>
            </View>
}
        </ScrollView>
    );
};

export default EditProfileScreen;
