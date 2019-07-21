import { Component, OnInit } from '@angular/core';
import { UsuariosApiServiceService } from '../../servicios/usuarios-api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private usuariosApi: UsuariosApiServiceService,
    private router: Router
  ) {}

  public nombre_aplicacion = 'Calculador de escaños';

  ngOnInit() {}

  onLogout(): void {
    this.usuariosApi.logoutUsuario();
    this.router.navigate(['']);
  }
}
