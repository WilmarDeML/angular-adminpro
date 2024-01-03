import { Hospital } from "./hospital.model"

interface MedicoUser {
    uid: string,
    nombre: string,
    img: string
}

export interface Medico {
    nombre: string,
    mid?: string,
    img?: string,
    usuario?: MedicoUser,
    hospital?: Hospital
}
