import { User } from "./user";

type EstadoCandidatura = {
   Aproved : 'aprovado',
    Recused : 'recusado'
    Winner : 'ganho',
    wait : 'pendente'
  }


export interface IInscricoes {
    id?: number;
    usuarioId: number;
    itemId: number;
    estado_candidatura: EstadoCandidatura;
    usuario : User;
    createdAt?: Date;
    updatedAt?: Date;
}