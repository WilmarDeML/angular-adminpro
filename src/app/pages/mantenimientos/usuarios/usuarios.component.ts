import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = []
  usuariosTemp: Usuario[] = []
  totalUsuarios: number = 0
  desde: number = 0
  limit: number = 5
  cargando: boolean = false
  imgSubs?: Subscription

  constructor(private usuariosService: UsuarioService, private busquedaService: BusquedasService, private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(({ id, img }) => this.actualizarImagen({ id, img }))
  }

  actualizarImagen({ id, img }: { id: string; img: string; }): void {
    this.usuarios = this.usuarios.map(usuario => {
      if (usuario.uid === id) {
        usuario.img = img
      }
      return usuario
    })
  }

  obtenerUsuarios(desde: number = 0) {
    this.cargando = true
    if (desde) {
      this.desde += desde
    }
    this.usuariosService.obtenerUsuarios(this.desde, this.limit).subscribe({
      next: ({ usuarios, totalUsuarios }) => {
        this.usuarios = usuarios
        this.usuariosTemp = usuarios
        this.totalUsuarios = totalUsuarios
        this.cargando = false
      },
      error: err => {
        this.cargando = false
        console.error('Error obteniendo usuarios... ', err)
      }
    });
  }

  buscar(termino: string) {
    if (!termino) {
      this.usuarios = this.usuariosTemp
    } else {
      this.cargando = true
      this.busquedaService.buscar('usuarios', termino).subscribe({
        next: (users: [Usuario]) => {
          this.cargando = false
          this.usuarios = users
        },
        error: err => {
          this.cargando = false
          console.error('Error buscando usuarios con termino: ', err)
        }
      })
    }
  }

  eliminar(usuario: Usuario) {
    if (usuario.uid === this.usuariosService.uid) {
      Swal.fire('¡Atención!', 'No puedes eliminarte a ti mismo', 'warning')
      return
    }
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `Estás a punto de eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminarlo!'
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.usuariosService.eliminarUsuario(usuario.uid).subscribe({
          next: ({ ok, usuario, msg }) => {
            if (ok) {
              if (this.usuarios.length === 1) {
                this.desde -= this.limit
              }
              this.obtenerUsuarios()
              Swal.fire('¡Eliminado!', `${usuario.nombre} ha sido eliminado`, 'success');
            } else {
              Swal.fire('¡Atención!', msg, 'warning');
            }
          },
          error: err => {
            console.error('Error eliminando usuario... ', err.msg)
            Swal.fire('¡Error!', err.msg, 'error');
          }
        })
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuariosService.guardarUsuario(usuario).subscribe({
      next: resp => resp,
      error: err => {
        console.error(err)
        Swal.fire('¡Error!', err.msg, 'error')
      }
    })
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.mostrarModal('usuarios', usuario.uid, usuario.img)
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe()
  }

}
