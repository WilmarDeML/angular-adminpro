import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent {

  profileForm: FormGroup
  usuario: Usuario
  imagenNueva!: File 
  imagenTemporal?: string

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario
    const { nombre, email } = this.usuario
    this.profileForm = this.fb.group({
      nombre: [nombre ?? '', [Validators.required, Validators.minLength(3)]],
      email: [
        { value: email ?? '', disabled: this.usuario.google }, 
        [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]
      ],
    })
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.profileForm.value).subscribe({
      next: (resp: any) => {
        this.usuario.email = resp.usuario?.email
        this.usuario.nombre = resp.usuario?.nombre
        Swal.fire('Bien hecho', 'Cambios guardados', 'success')
      },
      error: (err) => {
        Swal.fire('Error al guardar cambios, intente de nuevo', err.error.msg, 'error')
      }
    })
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
    if (this.imagenNueva && this.usuario.uid) {      
      this.fileUploadService.actualizarFoto(this.imagenNueva, 'usuarios', this.usuario.uid).then(nombreArchivo => {
        this.usuario.img = nombreArchivo
        this.imagenTemporal = undefined
      })
    }
  }

}
