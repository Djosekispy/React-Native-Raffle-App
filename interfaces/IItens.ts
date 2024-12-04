import { IInscricoes } from "./IInscricoes";


export interface IItens {
    id?: number;
    nome: string;
    propriedades: object;
    descricao: string;
    categoriaId: number;
    inscricoes ? : IInscricoes[];
    createdAt?: Date;
    updatedAt?: Date;
}