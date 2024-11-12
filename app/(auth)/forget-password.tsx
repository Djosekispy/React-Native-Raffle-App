import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { Link, useRouter } from 'expo-router';
import * as yup from 'yup';

const schemaForgetPassword = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
});

type FormDataForgetPassword = {
  email: string;
};

export default function ForgetPassword() {
    const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataForgetPassword>({
    resolver: yupResolver(schemaForgetPassword)
  });

  const onSubmit = async (data: FormDataForgetPassword) => {
    try {
      // Implementar lógica de recuperação de senha
      router.push({pathname: '/confirm-recovery-code', params: {email: data.email}});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6 py-8">
      {/* Cabeçalho */}
      <View className="mb-8 justify-center items-center">
        <Text className="text-3xl font-bold text-gray-800 mb-4">
          Esqueceu sua senha?
        </Text>
        <Text className="text-gray-600 text-base text-center">
          Não se preocupe! Digite seu email abaixo e enviaremos instruções para recuperar sua senha.
        </Text>
      </View>

      {/* Formulário */}
      <View className="w-full space-y-4">
        <View>
          <Text className="text-gray-700 text-sm mb-2 font-medium">
            Email
          </Text>
          <FormInput
            control={control}
            name="email"
            icon="envelope-o"
            error={errors.email?.message}
            placeholder="Digite seu email"
            keyboardType="email-address"
          />
        </View>

        {/* Botão de enviar */}
        <TouchableOpacity
          className="bg-[#FF7F50] py-4 rounded-lg mt-4"
          accessibilityRole="button"
          accessibilityLabel="Enviar instruções"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Enviar instruções
          </Text>
        </TouchableOpacity>

        {/* Link para voltar */}
        <View className="mt-6 items-center">
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-gray-600 text-base">
                Voltar para o login
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Informações adicionais */}
      <View className="mt-8 px-4">
        <Text className="text-gray-500 text-sm text-center">
          Não recebeu o email? Verifique sua pasta de spam ou tente novamente em alguns minutos.
        </Text>
      </View>
    </View>
  );
}
