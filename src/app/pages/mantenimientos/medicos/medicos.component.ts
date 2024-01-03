import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  cargando: boolean = false
  medicos: any[] = []
  medicosTemp: any[] = []
  imgSubs?: Subscription

  constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) {}
  
  ngOnInit(): void {
    this.obtenerMedicos()
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(({ id, img }) => this.actualizarImagen({ id, img }))
  }
  
  actualizarImagen({ id, img }: { id: string; img: string; }): void {
    this.medicos = this.medicos.map(medico => {
      if (medico.mid === id) {
        medico.img = img
      }
      return medico
    })
  }

  obtenerMedicos() {
    this.cargando = true
    this.medicoService.obtenerMedicos().subscribe({
      next: (medicos: Medico[]) => {
        this.medicos = medicos
        this.medicosTemp = this.medicos
        this.cargando = false
      },
      error: err => console.error('Error consultando medicos: ', err)
    })
  }

  buscar(termino: string) {
    if (!termino) {
      this.medicos = this.medicosTemp
    } else {
      this.cargando = true
      this.busquedaService.buscar('medicos', termino).subscribe({
        next: (medicos: [Medico]) => {
          this.cargando = false
          this.medicos = medicos
        },
        error: err => {
          this.cargando = false
          console.error('Error buscando medicos con termino: ', err)
        }
      })
    }
  }

  eliminarMedico(medico: Medico) {
    const { mid, nombre } = medico
    Swal.fire({
      title: '¿Eliminar médico?',
      text: `Estás a punto de eliminar a ${nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminarlo!'
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.medicoService.eliminarMedico(mid).subscribe({
          next: () => this.medicos = this.medicos.filter(medico => medico.mid !== mid ),
          error: err => Swal.fire('¡Error!', `Error al eliminar médico: ${err.msg}`, 'error')
        })  
      }
    })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.mostrarModal('medicos', medico.mid, medico.img)
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe()
  }

}
