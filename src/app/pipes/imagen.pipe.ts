import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.baseUrl}/uploads`

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img?: string, tipo?: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (img?.includes('https')) {
      return img
    }
    return img ? `${baseUrl}/${tipo}/${img}` : `${baseUrl}/${tipo}/no-image`
  }

}
