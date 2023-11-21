import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn')
  googleBtn!: ElementRef

  loginForm: FormGroup

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private zone: NgZone) {
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email'), [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: false
    })
  }

  ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "519337197692-ium978015nkd0904hc1f1fsqhqnsq5im.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
        // document.getElementById("buttonDiv"),
        this.googleBtn.nativeElement,
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse({ credential } : { credential: string }) {
    this.usuarioService.loginGoogle(credential).subscribe({
      next: resp => {
        console.log('Usuario logueado con google')
        this.zone.run(() => this.router.navigate(['/']));
      },
      error: err => {
        console.log(err)
        Swal.fire('Error logueando con google', `${err.error.msg}`, 'warning')
      }
    })
  }  

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe({
      next: resp => {
        console.log('Usuario logueado')
        this.router.navigate(['/']);
      }, 
      error: err => {
        console.warn(err)
        Swal.fire('Error logueando usuario', `${err.error.msg}`, 'warning')
      }
    })
  }

}
