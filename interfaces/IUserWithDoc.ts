interface IUserWithDoc {
    id?: number;
    nome_completo: string;
    data_nascimento?: Date;
    email: string;
    telefone?: string;
    endereco?: string;
    senha: string;
    foto_perfil?: string;
    tipo_perfil?: 'cliente' | 'sorteador';
    sexo?: string;
    token_acesso? : string;
    estado_civil?: string;
    numero_bilhete?: string;
    documentos : IDocumentos[];
    codigo_recuperacao? : number;
    createdAt?: Date;
    updatedAt?: Date;
  };
  interface IDocumentos {
    id?: number;
    bilheteUrl: string;
    nif: string;
    licenca: string;
    estado: EstadoDocumento;
    usuarioId: number;
    createdAt: Date;
    updatedAt: Date;
}

type EstadoDocumento = 'verificado' | 'pendente';

  export { IUserWithDoc }
 