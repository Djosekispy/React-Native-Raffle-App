import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import * as yup from 'yup';

const schemaConfirmCode = yup.object({
  code: yup.string()
    .required('O código é obrigatório')
    .min(6, 'O código deve ter 6 dígitos')
    .max(6, 'O código deve ter 6 dígitos')
});

type FormDataConfirmCode = {
  code: string;
};

export default function ConfirmRecoveryCode() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataConfirmCode>({
    resolver: yupResolver(schemaConfirmCode)
  });

  const onSubmit = async (data: FormDataConfirmCode) => {
    try {
      // Implementar verificação do código
     router.push({pathname: "/reset-password", params: {email: email}});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6 py-8">
      {/* Cabeçalho */}
      <View className="mb-8 justify-center items-center">
        <Text className="text-3xl font-bold text-gray-800 mb-4">
          Confirme o código
        </Text>
        <Text className="text-gray-600 text-base text-center">
          Digite o código de 6 dígitos que enviamos para seu email para continuar com a recuperação de senha.
        </Text>
      </View>

      {/* Formulário */}
      <View className="w-full space-y-4">
        <View>
          <Text className="text-gray-700 text-sm mb-2 font-medium">
            Código de verificação
          </Text>
          <FormInput
            control={control}
            name="code"
            icon="key"
            error={errors.code?.message}
            placeholder="Digite o código de 6 dígitos"
            keyboardType="numeric"
          />
        </View>

        {/* Botão de verificar */}
        <TouchableOpacity
          className="bg-[#FF7F50] py-4 rounded-lg mt-4"
          accessibilityRole="button"
          accessibilityLabel="Verificar código"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Verificar código
          </Text>
        </TouchableOpacity>

        {/* Links auxiliares */}
        <View className="mt-6 flex-row justify-between">
          <Link href="/forget-password" asChild>
            <TouchableOpacity>
              <Text className="text-gray-600 text-base">
                Reenviar código
              </Text>
            </TouchableOpacity>
          </Link>

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
          O código expira em 10 minutos. Caso não tenha recebido, verifique sua pasta de spam ou solicite um novo código.
        </Text>
      </View>
    </View>
  );
}
