import { ICategoria } from "./ICategory"


interface IRaffle {
    id?: number,
    nome: string,
    cover?: string,
    data_realizacao: Date,
    status: StatusRaffle,
    organizadorId: number,
    politicas: string,
    createdAt?: Date,
    updatedAt?: Date
    categorias? : ICategoria[]
}

enum StatusRaffle  {
    now = 'corrente',
    canceled = 'cancelado',
    finished = 'finalizado'
}

export { IRaffle,StatusRaffle }