import { IItens } from "./IItens";


export interface ICategoria {
  id: number;
  nome: string;
  descricao: string;
  sorteioId: number;
  createdAt?: Date;
  updatedAt?: Date;
  itens ? :IItens[]
}