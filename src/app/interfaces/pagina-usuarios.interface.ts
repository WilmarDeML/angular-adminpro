import { Usuario } from "../models/usuario.model"

export interface PaginaUsuarios {
    totalUsuarios: number
    usuarios: Usuario[]
}