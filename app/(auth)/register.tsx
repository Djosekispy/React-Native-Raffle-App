import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SocialButton } from '@/components/loginForm/SocialButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { useAuth } from '@/context';
import { FormDataRegister, schemaRegister } from '@/interfaces/IAuth';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { ActivityIndicator } from 'react-native';





export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [isError, setIsError] = useState('');
   const [ isLoading, setIsLoading ] = useState(false);
  const canGoBack = router.canGoBack();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataRegister>({
    resolver: yupResolver(schemaRegister)
  });

  const onSubmit = async (data: FormDataRegister) => {
    setIsLoading(true);
    try {
     const user = await register(data.email, data.password, data.username);
      if('error' in user){
        setIsError(user.error);
      }else{
        router.replace({pathname: '/login', params: {email: data.email, password: data.password}});
      }
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  };

  return (
      <View className="flex-1 bg-white items-center justify-center px-6 py-8 gap-4">
      {/* Cabeçalho */}
      <View className="mb-4 justify-center items-center">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Crie sua conta
        </Text>
       
      </View>
      {/* Formulário */}
      <View className="space-y-4">
      {isError && (
         <View className="bg-red-100 border border-red-400 rounded-md p-3 mb-4">
           <Text className="text-red-700 font-medium">
             {isError}
           </Text>
         </View>
       )}
      <View>
          <Text className="text-gray-700 text-sm mb-4 font-medium">
            Nome de usuário
          </Text>
            <FormInput
              control={control}
              name="username"
              icon="user"
              placeholder="Seu nome de usuário"
              error={errors.username?.message}
            />
        </View>
        <View>
          <Text className="text-gray-700 text-sm mb-4 font-medium">
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
          <Text className="text-gray-700 text-sm mb-4 font-medium">
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
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity 
            accessibilityRole="button"
            accessibilityLabel="Criar nova conta"
          >
            
              <Link href="/login" asChild>
              <Text className="text-gray-600 text-base hover:text-blue-700">
              Já tenho uma conta
              </Text>
              </Link>
           
          </TouchableOpacity>
          
        </View>

        {/* Botão de login */}
        <TouchableOpacity
          className="bg-[#FF7F50] py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800"
          accessibilityRole="button"
          disabled={isLoading}
          accessibilityLabel="Criar conta"
          onPress={handleSubmit(onSubmit)}
        >
       {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white text-center font-semibold text-xl">
            Criar conta
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