import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent {

  imagenNueva!: File 
  imagenTemporal?: string 
  
  constructor(public modalImagenService: ModalImagenService, private fileUploadService: FileUploadService) {}

  cerrarModal() {
    this.imagenTemporal = undefined
    this.modalImagenService.ocultarModal()
  }

  elegirImagen(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    if(!element.files?.length) {
      return this.imagenTemporal = undefined
    }
    this.imagenNueva =  element.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(this.imagenNueva)
    reader.onloadend = () => this.imagenTemporal = reader.result?.toString()
  }

  actualizarImagen() {

    const id = this.modalImagenService.id
    const tipo = this.modalImagenService.tipo

    if (this.imagenNueva && id) {      
      this.fileUploadService.actualizarFoto(this.imagenNueva, tipo, id).then( img => {
        this.modalImagenService.nuevaImagen.emit({ id, img })
        this.modalImagenService.ocultarModal()
        this.imagenTemporal = undefined
      })
    }
  }
}
