import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { PaginaUsuarios } from '../interfaces/pagina-usuarios.interface';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario

  constructor(private http: HttpClient, private router: Router) {
    this.usuario = new Usuario('', '', '', '', '', false, '', '')
  }

  get uid() {
    return this.usuario.uid ?? ''
  }

  get token() {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return { headers: { 'x-token': this.token } }
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${baseUrl}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { nombre, email, estado, role, google, img, uid } = resp.usuario
        this.usuario = new Usuario(nombre, email, estado, '', role, google, img, uid)
        localStorage.setItem('token', resp.token)
        return resp.ok
      }),
      catchError(() => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap(({ token }: any) => localStorage.setItem('token', token))
    )
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, this.headers)
  }

  login(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap(({ token }: any) => {
        localStorage.setItem('token', token)
        formData.remember
          ? localStorage.setItem('email', formData.email)
          : localStorage.removeItem('email')
      })
    )
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap(({ token }: any) => {
        localStorage.setItem('token', token)
      })
    )
  }

  obtenerUsuarios(desde: number, limit: number) {
    return this.http.get<PaginaUsuarios>(`${baseUrl}/usuarios?desde=${desde}&limit=${limit}`, this.headers)
      .pipe(
        map(resp => {
          resp.usuarios = resp.usuarios.map(user => {
            return new Usuario(user.nombre, user.email, user.estado, undefined, user.role, user.google, user.img, user.uid)
          })
          return resp
        })
      )
  }

  eliminarUsuario(uid: string | undefined) {
    return this.http.delete(`${baseUrl}/usuarios/${uid}`, this.headers) as Observable<{ ok: boolean, usuario: Usuario, msg: string }>
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${baseUrl}/usuarios/${usuario.uid}`, usuario, this.headers)
  }
}
