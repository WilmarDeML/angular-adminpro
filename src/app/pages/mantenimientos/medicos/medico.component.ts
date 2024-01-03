import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  medicoForm!: FormGroup
  hospitales: Hospital[] = []
  hospitalSeleccionado?: Hospital
  medicoActual?: Medico
  title: string = 'Crear Médico'
  imgSubs?: Subscription

  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService,
    private router: Router, private activatedRoute: ActivatedRoute, private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(({ id, img }) => this.actualizarImagen({ id, img }))
    this.obtenerHospitales()
    this.obtenerMedico()
    this.initForm();
    this.escucharCambiosHospital()
  }

  actualizarImagen({ id, img }: { id: string; img: string; }): void {
    if (this.medicoActual?.mid === id) this.medicoActual.img = img
  }

  obtenerMedico() {
    this.activatedRoute.params.subscribe(({ mid }) => {
      if (mid !== 'nuevo') {
        this.title = 'Actualizar Médico'
        this.medicoService.obtenerMedicoPorId(mid).pipe(delay(100)).subscribe({
          next: medico => {
            this.medicoActual = medico
            this.medicoForm.setValue({ nombre: medico.nombre, hospital: medico.hospital?.hid ?? '' })
          },
          error: err => {
            this.title = 'Crear Médico'
            console.error(err)
            this.router.navigateByUrl(`dashboard/medicos/nuevo`)
          }
        })
      }
    })
  }

  obtenerHospitales() {
    this.hospitalService.obtenerHospitales().subscribe({
      next: hospitales => {
        this.hospitales = hospitales
      },
      error: err => Swal.fire('¡Error!', `Error al traer los hospitales: ${err.msg}`)
    });
  }

  private initForm() {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
  }

  escucharCambiosHospital() {
    this.medicoForm.get('hospital')?.valueChanges.subscribe({
      next: hid => this.hospitalSeleccionado = this.hospitales.find(hospital => hospital.hid === hid)
    })
  }

  guardarMedico() {
    let data;
    if (!this.medicoActual) {
      data = this.medicoForm.value
      this.medicoService.crearMedico(data).subscribe({
        next: ({ nombre, mid }) => {
          Swal.fire('¡Guardado!', `¡El médico ${nombre} ha sido registrado!`, 'success')
          this.router.navigateByUrl(`dashboard/medicos/${mid}`)
        },
        error: err => Swal.fire('¡Error!', `Error al crear médico: ${err.msg}`)
      })
    } else {
      data = { ...this.medicoForm.value, mid: this.medicoActual.mid }
      this.medicoService.actualizarMedico(data).subscribe({
        next: ({ nombre, mid }) => {
          Swal.fire('¡Actualizado!', `¡El médico ${nombre} ha sido actualizado!`, 'success')
          this.router.navigateByUrl(`dashboard/medicos/${mid}`)
        },
        error: err => Swal.fire('¡Error!', `Error al actualizar médico: ${err.error.msg}`)
      })
    }
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.mostrarModal('medicos', medico.mid, medico.img)
  }

}
