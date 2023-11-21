import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup
  formSubmitted = false
  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['Wil', [Validators.required, Validators.minLength(3)]],
      email: ['u@u.uom', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['123456', [Validators.required, Validators.minLength(6)]],
      terminos: [true, [Validators.required]],
      estado: [true],
    }, { validators: [ this.validateContrasenas(), this.validateTerminos() ] } as  AbstractControlOptions);
  }

  crearUsuario() {
    this.formSubmitted = true
    this.registerForm.valid
    ? this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp => {
        console.log('Usuario creado')
        console.log(resp)
        this.router.navigate(['/']);
      }, err => {
        Swal.fire('Error creando usuario', `${err.error.msg}`, 'warning')
      })
    : console.log('Error en formulario')
  }

  campoNoValido(campo: string): boolean | undefined | null {
    return this.registerForm.get(campo)?.invalid && this.formSubmitted
  }

  validateContrasenas(): Function {
    return (formGruoup: FormGroup) => {
      const pass1 = formGruoup.get('password')?.value
      const pass2Control = formGruoup.get('confirmPassword')
      pass2Control?.setErrors(pass1 === pass2Control.value ? null : { noEsIgual: true })
    }
  }
  
  validateTerminos(): Function {
    return (formGroup: FormGroup) => {
      const terminosControl = formGroup.get('terminos')
      terminosControl?.setErrors(terminosControl.value ? null : { noCheckTerminos: true })
    }
  }

}
