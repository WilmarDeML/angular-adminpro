import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return { headers: { 'x-token': this.token } }
  }

  obtenerHospitales(): Observable<Hospital[]> {
    return this.http.get<{ hospitales: Hospital[], ok: boolean }>(`${baseUrl}/hospitales`, this.headers)
      .pipe(
        map(({ hospitales }) => hospitales)
      )
  }

  crearHospital(nombre: string): Observable<Hospital> {
    return this.http.post<{ ok: boolean, hospital: Hospital }>(`${baseUrl}/hospitales`, { nombre }, this.headers)
      .pipe(
        map(({ hospital }) => hospital)
      )
  }
  
  actualizarHospital(hid?: string, nombre?: string): Observable<Hospital> {
    return this.http.put<{ ok: boolean, hospital: Hospital }>(`${baseUrl}/hospitales/${hid}`, { nombre }, this.headers)
      .pipe(
        map(({ hospital }) => hospital)
      )
  }
  
  eliminarHospital(hid?: string): Observable<Hospital> {
    return this.http.delete<{ ok: boolean, hospital: Hospital }>(`${baseUrl}/hospitales/${hid}`, this.headers)
      .pipe(
        map(({ hospital }) => hospital)
      )
  }
}
