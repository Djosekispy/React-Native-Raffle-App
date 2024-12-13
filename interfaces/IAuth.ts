import * as yup from 'yup';

const schemaRegister = yup.object({
    email: yup.string()
      .required('E-mail é obrigatório')
      .email('Digite um e-mail válido'),
    username: yup.string()
      .required('Nome de usuário é obrigatório'),
    password: yup.string()
      .required('Senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });
  
  type FormDataRegister = yup.InferType<typeof schemaRegister>;

  
const schemaLogin = yup.object({
    email: yup.string()
      .required('E-mail é obrigatório')
      .email('Digite um e-mail válido'),
    password: yup.string()
      .required('Senha é obrigatória')
  });
  
  type FormDataLogin = yup.InferType<typeof schemaLogin>;

  export { schemaRegister, FormDataRegister, schemaLogin, FormDataLogin };