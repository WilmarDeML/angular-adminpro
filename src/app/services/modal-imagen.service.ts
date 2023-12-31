import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _mostrarModal: boolean = false
  public tipo!: 'usuarios'|'medicos'|'hospitales'
  public id?: string
  public img!: string
  
  public nuevaImagen: EventEmitter<{id: string, img: string}> = new EventEmitter()

  get esMostrarModal() {
    return this._mostrarModal
  }

  mostrarModal(tipo: 'usuarios'|'medicos'|'hospitales', id?: string, img: string = 'no-img') {
    this._mostrarModal = true
    this.tipo = tipo
    this.id = id

    if (!img.includes('https')) {
      img = `${baseUrl}/uploads/${tipo}/${img}`
    }

    this.img = img
  }

  ocultarModal() {
    this._mostrarModal = false
  }

  constructor() { }
}
