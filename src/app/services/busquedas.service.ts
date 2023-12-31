import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token() {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return { headers: { 'x-token': this.token } }
  }

  buscar( tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string ) {
    return this.http.get(`${baseUrl}/busquedas/${tipo}/${termino}`, this.headers).pipe(
      map(({ resultados }: any) => {
        switch (tipo) {
          case 'usuarios':
            return resultados.map((user: Usuario) => {
              return new Usuario(user.nombre, user.email, user.estado, undefined, user.role, user.google, user.img, user.uid)
            })        
          default:
            break;
        }
      })
    )
  }
}
