import ProfileHeader from '@/components/userPage/ProfileHeader';
import React, { useState } from 'react';
import { View, Text, ScrollView,  RefreshControl, SafeAreaView } from 'react-native';
import {useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/context';
import { useForm } from 'react-hook-form';
import { User } from '@/interfaces/user';
import FormProfile from '@/components/userPage/formProfile';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const { user, logout,replaceLocalUseData } = useAuth();
    const [refreshing, setRefreshing] = React.useState(false);
    const router = useRouter();
    const { sucess } = useLocalSearchParams<{sucess : string}>()
    const { control, handleSubmit, formState: { errors } } = useForm<User>({
      defaultValues: {
       ...user
      },
    });
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(async () => {
          await replaceLocalUseData()
          setRefreshing(false);
        }, 2000);
      }, []);
  
    return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} alwaysBounceVertical
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className='p-4 mt-4 flex-row justify-evenly items-center'>
            <Ionicons name='arrow-back' size={25} color={"#000"}  onPress={()=>router.back()}/>
            <Text className='font-bold text-2xl text-black px-12 text-center my-4  py-2 rounded-2xl'>Informações Pessoais</Text>
          </View>
        <View className="flex-1 mx-4">
            <ProfileHeader email={user?.email} name={user?.nome_completo} image={user?.foto_perfil} onRefresh={onRefresh} />
            
               <View className='my-4'>
               {sucess && (
                   <View className="bg-green-100 border border-green-400 rounded-md p-3 mb-4">
                       <Text className="text-green-700 font-medium">
                           {sucess}
                       </Text>
                   </View>
               )}
              
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
        </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ProfileScreen;