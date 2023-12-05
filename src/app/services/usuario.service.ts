import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario

  constructor(private http: HttpClient, private router: Router) {
    this.usuario = new Usuario( '', '', '', '', '', false, '', '' )
  }

  get uid() {
    return this.usuario.uid ?? ''
  }

  get token() {
    return localStorage.getItem('token') || ''
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${baseUrl}/login/renew`, { headers: { 'x-token': this.token }}).pipe(
      map((resp: any) => {
        const { nombre, email, estado, role, google, img, uid } = resp.usuario
        this.usuario =  new Usuario( nombre, email, estado, '', role, google, img, uid )
        localStorage.setItem('token', resp.token)
        return resp.ok
      }),
      catchError(() => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    console.log(formData)
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap(({ token }: any) => localStorage.setItem('token', token))
    )
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string }) {
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, { ...data, role: this.usuario.role }, {
      headers: { 'x-token': this.token }
    })
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
}
