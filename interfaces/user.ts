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

  export { User }