import { IItens } from "./IItens";
import { IRaffle } from "./IRaffles";

export interface ICategoria {
  id: number;
  nome: string;
  descricao: string;
  sorteioId: number;
  sorteio ? : IRaffle;
  createdAt?: Date;
  updatedAt?: Date;
  itens ? :IItens[]
}