import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return { headers: { 'x-token': this.token } }
  }

  obtenerMedicos(): Observable<Medico[]> {
    return this.http.get<{ medicos: Medico[], ok: boolean }>(`${baseUrl}/medicos`, this.headers)
      .pipe(
        map(({ medicos }) => medicos)
      )
  }
  
  obtenerMedicoPorId(mid: string): Observable<Medico> {
    return this.http.get<{ medico: Medico, ok: boolean }>(`${baseUrl}/medicos/${mid}`, this.headers)
      .pipe(
        map(({ medico }) => medico)
      )
  }

  crearMedico(medico: Medico): Observable<Medico> {
    return this.http.post<{ ok: boolean, medico: Medico }>(`${baseUrl}/medicos`, medico, this.headers)
      .pipe(
        map(({ medico }) => medico)
      )
  }
  
  actualizarMedico(medico: Medico): Observable<Medico> {
    const { mid } = medico
    return this.http.put<{ ok: boolean, medico: Medico }>(`${baseUrl}/medicos/${mid}`, medico, this.headers)
      .pipe(
        map(({ medico }) => medico)
      )
  }
  
  eliminarMedico(mid?: string): Observable<Medico> {
    return this.http.delete<{ ok: boolean, medico: Medico }>(`${baseUrl}/medicos/${mid}`, this.headers)
      .pipe(
        map(({ medico }) => medico)
      )
  }
}
