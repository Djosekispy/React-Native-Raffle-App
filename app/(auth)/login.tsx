import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { SocialButton } from '@/components/loginForm/SocialButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import * as yup from 'yup';
import { useAuth } from '@/context';



const schema = yup.object({
    email: yup.string()
      .required('E-mail é obrigatório')
      .email('Digite um e-mail válido'),
    password: yup.string()
      .required('Senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });
  
  type FormData = yup.InferType<typeof schema>;
export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6 py-8">
      {/* Cabeçalho */}
      <View className="mb-12">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Bem-vindo de volta
        </Text>
        <Text className="text-gray-600 text-base">
          Entre com suas credenciais para acessar
        </Text>
      </View>

      {/* Formulário */}
      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 text-sm mb-2 font-medium">
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
          <Text className="text-gray-700 text-sm mb-2 font-medium">
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
            <Text className="text-gray-600 text-base hover:text-blue-700">
              Criar conta
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Recuperar senha"
          >
            <Text className="text-gray-600 text-base hover:text-blue-700">
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão de login */}
        <TouchableOpacity
          className="bg-[#FF7F50] py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800"
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