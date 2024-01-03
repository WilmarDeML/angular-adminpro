interface HospitalUser {
    uid: string,
    nombre: string,
    img: string
}

export interface Hospital {
    nombre: string,
    hid?: string,
    img?: string,
    usuario?: HospitalUser
}
