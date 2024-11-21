import { Resolver } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
type User = {
    id?: number;
    nome_completo: string;
    data_nascimento?: Date;
    email: string;
    telefone: string;
    endereco?: string;
    senha: string;
    foto_perfil?: string;
    tipo_perfil?: 'cliente' | 'sorteador';
    sexo?: string;
    token_acesso? : string;
    estado_civil?: string;
    numero_bilhete?: string;
    codigo_recuperacao? : number;
    createdAt?: Date;
    updatedAt?: Date;
  };
 

  
  const schemaUser = yup.object({
    nome_completo: yup.string().required('Nome completo é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    telefone: yup.string().required('Telefone é obrigatório'),
    senha: yup.string().required('Senha é obrigatória'),
    endereco: yup.string().nullable(),
    data_nascimento: yup.date().nullable(),
    foto_perfil: yup.string().url('URL da foto de perfil inválida').nullable(),
    tipo_perfil: yup
      .string()
      .oneOf(['cliente', 'sorteador'], 'Tipo de perfil inválido')
      .nullable(),
    sexo: yup.string().nullable(),
    token_acesso: yup.string().nullable(),
    estado_civil: yup.string().nullable(),
    numero_bilhete: yup.string().nullable(),
    codigo_recuperacao: yup.number().integer().nullable(),
    createdAt: yup.date().nullable(),
    updatedAt: yup.date().nullable(),
  });
  
  type UserSchema = InferType<typeof schemaUser>;
  
   const resolver: Resolver<UserSchema> = async (values, context) => {
    return schemaUser
      .validate(values, { abortEarly: false })
      .then((data) => ({ values: data, errors: {} }))
      .catch((err) => ({
        values: {},
        errors: err.inner.reduce(
          (allErrors: any, currentError: any) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? 'validation',
              message: currentError.message,
            },
          }),
          {}
        ),
      }));
  };
  
  export { User , resolver, UserSchema,schemaUser}
