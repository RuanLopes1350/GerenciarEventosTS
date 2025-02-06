import { interfaceUsuario } from "./interfaceUsuario"

export interface interfaceEvento {
    id: string
    nome: string
    data: Date
    usuarioCriador: interfaceUsuario
}