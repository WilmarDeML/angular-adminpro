import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  hospitales: any[] = []
  hospitalesTemp: any[] = []
  cargando: boolean = false
  areThereChanges: boolean = false
  imgSubs?: Subscription

  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales()
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(({ id, img }) => this.actualizarImagen({ id, img }))
  }

  actualizarImagen({ id, img }: { id: string; img: string; }): void {
    this.hospitales = this.hospitales.map(hospital => {
      if (hospital.hid === id) {
        hospital.img = img
      }
      return hospital
    })
  }

  cargarHospitales() {
    this.cargando = true
    this.hospitalService.obtenerHospitales().subscribe({
      next: (hospitales: Hospital[]) => {
        this.hospitales = hospitales
        this.hospitalesTemp = this.hospitales
        this.cargando = false
      },
      error: err => console.error('Error consultando hospitales: ', err)
    })
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital.hid, hospital.nombre).subscribe({
      next: ({ nombre }) => Swal.fire('¡Bien hecho!', `¡El hospital ${nombre} ha sido actualizado correctamente!`, 'success'),
      error: err => Swal.fire('¡Error!', `Error al guardar cambios: ${err.error.msg}`, 'error')
    })
  }

  eliminarHospital(hospital: Hospital) {
    const { hid, nombre } = hospital
    Swal.fire({
      title: '¿Eliminar hospital?',
      text: `Estás a punto de eliminar a ${nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminarlo!'
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.hospitalService.eliminarHospital(hid).subscribe({
          next: () => this.hospitales = this.hospitales.filter(hospital => hospital.hid !== hid ),
          error: err => Swal.fire('¡Error!', `Error al eliminar hospital: ${err.error.msg}`, 'error')
        })  
      }
    })
  }

  async crearHospital() {
    const { value: nombreHospital, isConfirmed } = await Swal.fire({
      title: 'Crear hospital',
      showCancelButton: true,
      confirmButtonText: 'Crear hospital',
      input: 'text',
      inputLabel: 'Ingrese el nombre del hospital',
      inputPlaceholder: 'Nombre del hospital...',
      inputValue: '',
      inputValidator: value => {
        if (!value) {
          return "¡Por favor ingresa un nombre del hospital válido!";
        }
        return
      }
    })

    if (isConfirmed) {
      this.hospitalService.crearHospital(nombreHospital).subscribe({
        next: (hospital) => this.hospitales.push(hospital),
        error: err => Swal.fire('¡Error!', `Error al crear hospital: ${err.error.msg}`, 'error') 
      })      
    }
  }

  buscar(termino: string) {
    if (!termino) {
      this.hospitales = this.hospitalesTemp
    } else {
      this.cargando = true
      this.busquedaService.buscar('hospitales', termino).subscribe({
        next: (hospitales: [Hospital]) => {
          this.cargando = false
          this.hospitales = hospitales
        },
        error: err => {
          this.cargando = false
          console.error('Error buscando hospitales con termino: ', err)
        }
      })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.mostrarModal('hospitales', hospital.hid, hospital.img)
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe()
  }

}
