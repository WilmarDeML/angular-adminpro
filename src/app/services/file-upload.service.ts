import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto( archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) {
    try {
      const url = `${baseUrl}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      
      const resp = await fetch(url, { method: 'PUT', headers: { 'x-token': localStorage.getItem('token') || '' }, body: formData });
      const data = await resp.json();
      if (data.ok) {
        Swal.fire('Imagen actualizada', data.msg, 'success');
        return data.nombreArchivo;
      } else {
        Swal.fire('Error al subir la imagen', data.msg, 'error');
        return false;
      }
      
    } catch (error: any) {
      Swal.fire('Error al subir la imagen', error.msg, 'error');
    }
  }
}
