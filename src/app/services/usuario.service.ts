import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || ''

    return this.http.get(`${baseUrl}/login/renew`, { headers: { 'x-token': token }}).pipe(
      tap((resp: any) => localStorage.setItem('token', resp.token)),
      map( () => true ),
      catchError(() => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    console.log(formData)
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap(({ token }: any) => localStorage.setItem('token', token))
    )
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
