import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { map, of, take, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  return inject(UsuarioService).validarToken().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['login'])
      }
    })
  )

};
