import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SocialButton } from '@/components/loginForm/SocialButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { useAuth } from '@/context';
import { FormDataLogin, schemaLogin } from '@/interfaces/IAuth';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';


export default function Login() {
  const { login } = useAuth();
  const [ isLoading, setIsLoading ] = useState(false);
  const { email, password } = useLocalSearchParams<{ email: string, password: string }>();
  const [ isError, setIsError ] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataLogin>({
    defaultValues: {
      email: email || '',
      password: password || ''
    },
    resolver: yupResolver(schemaLogin)
  });

  const onSubmit = async (data: FormDataLogin) => {
    setIsLoading(true);
    try {
      const user = await login(data.email, data.password);
      if('error' in user){
        setIsError(user.error);
      }else{
        router.replace('/');
      }
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6 py-8">
      {/* Cabeçalho */}

      <View className="mb-12 justify-center items-center">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Bem-vindo de volta
        </Text>
       
      </View>

      {/* Formulário */}
      <View className="space-y-4 w-full">
       {isError && (
         <View className="bg-red-100 border border-red-400 rounded-md p-3 mb-4">
           <Text className="text-red-700 font-medium">
             {isError}
           </Text>
         </View>
       )}
        <View>
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
        </View>
  
        <View>
          <Text className="text-gray-700 text-sm my-4 font-medium">
            Senha
          </Text>
            <FormInput
              control={control}
              name="password"
              icon="lock"
              placeholder="Sua senha"
              secureTextEntry
              error={errors.password?.message}
            />
        </View>

        {/* Links auxiliares */}
        <View className="flex-row justify-between items-center my-4">
        
            <TouchableOpacity 
              accessibilityRole="button"
              accessibilityLabel="Criar nova conta"
            >
                <Link href="/register" asChild>
              <Text className="text-gray-600 text-base hover:text-blue-700">
                Criar nova conta
              </Text>
              </Link>
            </TouchableOpacity>
          

         
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Recuperar senha"
            >
               <Link href='/forget-password' asChild>
              <Text className="text-gray-600 text-base hover:text-blue-700">
                Esqueceu a senha?
              </Text>
              </Link>
            </TouchableOpacity>
         
        </View>

        {/* Botão de login */}
        <TouchableOpacity
          disabled={isLoading}
          className="bg-[#FF7F50] py-3 mt-4 rounded-lg hover:bg-blue-700 active:bg-blue-800"
          accessibilityRole="button"
          accessibilityLabel="Entrar na conta"
          onPress={handleSubmit(onSubmit)}
        >
       {isLoading ? <ActivityIndicator size={30}  color="#fff" /> : <Text className="text-white text-center font-semibold text-xl">
            Entrar
          </Text>}
        </TouchableOpacity>

        {/* Divisor */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="mx-4 text-gray-500">ou continue com</Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>

        {/* Botões sociais */}
        <View className="flex-row gap-4">
         
          <SocialButton
            icon="google"
            label="Google"
            color="#EA4335"
            onPress={() => {}}
          />

          <SocialButton
            icon="facebook"
            label="Facebook"
            color="#1877F2"
            onPress={() => {}}
          />
         
        </View>
      </View>
    </View>
  );
}