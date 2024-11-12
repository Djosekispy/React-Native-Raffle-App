import { View, Text, TouchableOpacity } from 'react-native';
import { SocialButton } from '@/components/loginForm/SocialButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { useAuth } from '@/context';
import { FormDataLogin, schemaLogin } from '@/interfaces/AuthDTO';
import { Link, useLocalSearchParams } from 'expo-router';


export default function Login() {
  const { login } = useAuth();
  const { email, password } = useLocalSearchParams<{ email: string, password: string }>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataLogin>({
    defaultValues: {
      email: email || '',
      password: password || ''
    },
    resolver: yupResolver(schemaLogin)
  });

  const onSubmit = async (data: FormDataLogin) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6 py-8">
      {/* Cabeçalho */}
      <View className="mb-12 justify-center items-center">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Bem-vindo de volta
        </Text>
        <Text className="text-gray-600 text-base text-center">
          Entre com suas credenciais para acessar sua conta e participar dos nossos sorteios exclusivos
        </Text>
      </View>

      {/* Formulário */}
      <View className="space-y-4 w-full">
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
          className="bg-[#FF7F50] py-3 mt-4 rounded-lg hover:bg-blue-700 active:bg-blue-800"
          accessibilityRole="button"
          accessibilityLabel="Entrar na conta"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold text-xl">
            Entrar
          </Text>
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