import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit{

  ngOnInit(): void {
    // const promesa = new Promise( (resolve, reject) => {
      //   false ? resolve('Hola mundo') : reject('Ups algo salio mal')
      // })
      
      // promesa.then( mensaje => console.log(mensaje)).catch( error => console.log(`Error en mi promesa: ${error}`))
      
      // console.log('Fin del Init')
    this.getUsers().then( console.log )
    // this.getUsers()
  } 

  getUsers() {
    return new Promise( (resolve, _reject) => {
      fetch('https://reqres.in/api/users').then( resp => resp.json()).then( body => resolve(body.data))
    })
  }

}
