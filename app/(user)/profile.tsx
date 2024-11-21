import ProfileHeader from '@/components/userPage/ProfileHeader';
import UserInfo from '@/components/userPage/UserInfo';
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Button from '@/components/userPage/Button';
import { Link, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@/interfaces/user';
import { FormInput } from '@/components/loginForm/loginInput';
import FormProfile from '@/components/userPage/formProfile';

const ProfileScreen = () => {
    const { user } = useAuth();
    const { sucess } = useLocalSearchParams<{sucess : string}>()
    const [ isError, setIsError ] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm<User>({
      defaultValues: {
       ...user
      },
    });

    return (
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} alwaysBounceVertical>
        <View className="flex-1 mx-4  pt-14">
            <ProfileHeader email={user?.email} name={user?.nome_completo} image={user?.foto_perfil} />
            
               <View className='my-4'>
               {sucess && (
                   <View className="bg-green-100 border border-green-400 rounded-md p-3 mb-4">
                       <Text className="text-green-700 font-medium">
                           {sucess}
                       </Text>
                   </View>
               )}
               <Text className='font-bold text-xl text-white text-center my-4 bg-black py-2 rounded-2xl'>Informações Pessoais</Text>
{ control._defaultValues.nome_completo && <FormProfile label='Nome Completo' name={control._defaultValues.nome_completo as string}/>}
{ control._defaultValues.email && <FormProfile label='Email' name={control._defaultValues.email as string}/>}
{ control._defaultValues.telefone && <FormProfile label='Telefone' name={control._defaultValues.telefone as string}/>}
{ control._defaultValues.endereco && <FormProfile label='Endereço' name={control._defaultValues.endereco as string}/>}
{ control._defaultValues.data_nascimento && <FormProfile label='Data de Nascimento' name={control._defaultValues.data_nascimento?.toISOString() as string}/>}
{ control._defaultValues.numero_bilhete && <FormProfile label='Número de Bilhete de Identidade' name={control._defaultValues.numero_bilhete as string}/>}
{ control._defaultValues.sexo && <FormProfile label='Gênero' name={control._defaultValues.sexo as string}/>}
{ control._defaultValues.estado_civil && <FormProfile label='Estado Civil' name={control._defaultValues.estado_civil as string}/>}
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

export default ProfileScreen;