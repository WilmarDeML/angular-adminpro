import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[];
  usuario: Usuario

  constructor(private sidebarService: SidebarService, private userService: UsuarioService) {
    this.menuItems = sidebarService.menu;
    this.usuario = userService.usuario;
  }
  
  logout() {
    this.userService.logout();
  }

}
