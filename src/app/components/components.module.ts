import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { GraficaComponent } from './grafica/grafica.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficaComponent,
    ModalImagenComponent
  ],
  exports: [
    IncrementadorComponent,
    GraficaComponent,
    ModalImagenComponent
  ],
  imports: [
    NgChartsModule,
    FormsModule,
    CommonModule
  ]
})
export class ComponentsModule { }
