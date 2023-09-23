import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {  
  
  @Input('valor') progreso: number = 80;
  @Input() btnClass: string = 'btn-primary';

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  cambiarProgreso(value: number): void {
    if (this.progreso + value > 100) {
      this.progreso = 100;
    } else if (this.progreso + value < 0) {
      this.progreso = 0;
    } else {
      this.progreso += value;
    }
    this.cambioValor.emit(this.progreso)
  }

  onChange(newValue: number) {
    if(newValue > 100 || newValue < 0) {
      return false;
    }
    if(!newValue) {
      newValue = 0;
    }
    this.progreso = newValue;
    return this.cambioValor.emit(this.progreso)
  }
  
}
