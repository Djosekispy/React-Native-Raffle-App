import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '@/components/loginForm/loginInput';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import * as yup from 'yup';

const schemaResetPassword = yup.object({
  password: yup.string()
    .required('A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/[0-9]/, 'A senha deve conter pelo menos um número'),
  confirmPassword: yup.string()
    .required('A confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não conferem')
});

type FormDataResetPassword = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataResetPassword>({
    resolver: yupResolver(schemaResetPassword)
  });

  const onSubmit = async (data: FormDataResetPassword) => {
    try {
      // Implementar lógica de redefinição de senha
      console.log(data);
      router.push({pathname: '/login', params: {email: email, password: data.password}});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6 py-8">
      {/* Cabeçalho */}
      <View className="mb-8 justify-center items-center">
        <Text className="text-3xl font-bold text-gray-800 mb-4">
          Crie uma nova senha
        </Text>
        <Text className="text-gray-600 text-base text-center">
          Sua nova senha deve ser diferente das senhas usadas anteriormente
        </Text>
      </View>

      {/* Formulário */}
      <View className="w-full space-y-4">
        <View>
          <Text className="text-gray-700 text-sm mb-2 font-medium">
            Nova senha
          </Text>
          <FormInput
            control={control}
            name="password"
            icon="lock"
            placeholder="Digite sua nova senha"
            secureTextEntry
            error={errors.password?.message}
          />
        </View>

        <View>
          <Text className="text-gray-700 text-sm mb-2 font-medium">
            Confirme a nova senha
          </Text>
          <FormInput
            control={control}
            name="confirmPassword"
            icon="lock"
            placeholder="Confirme sua nova senha"
            secureTextEntry
            error={errors.confirmPassword?.message}
          />
        </View>

        {/* Requisitos da senha */}
        <View className="bg-gray-50 p-4 rounded-lg">
          <Text className="text-gray-600 text-sm mb-2 font-medium">
            A senha deve conter:
          </Text>
          <Text className="text-gray-500 text-sm">• Mínimo de 8 caracteres</Text>
          <Text className="text-gray-500 text-sm">• Pelo menos uma letra maiúscula</Text>
          <Text className="text-gray-500 text-sm">• Pelo menos um número</Text>
        </View>

        {/* Botão de redefinir */}
        <TouchableOpacity
          className="bg-[#FF7F50] py-4 rounded-lg mt-4"
          accessibilityRole="button"
          accessibilityLabel="Redefinir senha"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Redefinir senha
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
    </View>
  );
}
