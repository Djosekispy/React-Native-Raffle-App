import ProfileHeader from '@/components/userPage/ProfileHeader';
import UserInfo from '@/components/userPage/UserInfo';
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import Button from '@/components/userPage/Button';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { User } from '@/interfaces/user';
import { schemaUser } from '@/interfaces/user';
import { UserSchema } from '@/interfaces/user';
import { useRouter } from 'expo-router';


const EditProfileScreen = () => {
    const { user , updateUser} = useAuth();
    const [isError, setIsError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<UserSchema>({
        defaultValues: { ...user },
        resolver: yupResolver(schemaUser),
    });

    const onSubmit = async (data: UserSchema) => {
        setIsLoading(true);
    try {
      const user = await updateUser(data);
      if('error' in user){
        setIsError(user.error);
      }else{
        router.replace({pathname: '/(user)/profile', params: {sucess : 'Dados actualizados com sucesso!'}});
      }
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false);
    }
    };

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} alwaysBounceVertical>
            <View className="flex-1 mx-4 pt-14">
                <ProfileHeader email={user?.email} name={user?.nome_completo} image={user?.foto_perfil} />
                
                <View className='my-4'>
                    <Text className='font-bold text-xl text-white text-center my-4 bg-black py-2 rounded-2xl'>Atualizar Informações Pessoais</Text>
                    {isError && (
         <View className="bg-red-100 border border-red-400 rounded-md p-3 mb-4">
           <Text className="text-red-700 font-medium">
             {isError}
           </Text>
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
                <TouchableOpacity
          disabled={isLoading}
          className="bg-[#FF7F50] py-3 mt-4 rounded-lg hover:bg-blue-700 active:bg-blue-800"
          accessibilityRole="button"
          accessibilityLabel="Entrar na conta"
          onPress={handleSubmit(onSubmit)}
        >
       {isLoading ? <ActivityIndicator size={30}  color="#fff" /> : <Text className="text-white text-center font-semibold text-xl">
            Salvar
          </Text>}
        </TouchableOpacity>
            </View>
            </View>
            <View className="flex-1 items-center justify-center bg-gray-200 py-4">
                <Text className="text-gray-700 text-center">
                    © 2023 Todos os direitos reservados.
                </Text>
            </View>
        </ScrollView>
    );
};

export default EditProfileScreen;