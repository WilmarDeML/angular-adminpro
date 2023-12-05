
import { environment } from "src/environments/environment"

const baseUrl = `${environment.baseUrl}/uploads/usuarios`
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public estado: string,
        public password?: string,
        public role?: string,
        public google?: boolean,
        public img?: string,
        public uid?: string,
    ) {}
    
    get urlImg() {
        
        if (this.img?.includes('https')) {
            return this.img 
        } 
        return this.img ? `${baseUrl}/${this.img}` : `${baseUrl}/no-image`
    }
}