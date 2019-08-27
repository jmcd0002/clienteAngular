import { Component, OnInit } from '@angular/core';
import { UsuariosApiServiceService } from '../../servicios/usuarios-api-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private usuariosApi: UsuariosApiServiceService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // if (event.url.match('/usuario')) {
        if (event.url === '/usuario' || event.url === '/usuario/perfil') {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      }
    });
  }

  public isLogged: boolean = false;

  public nombre_aplicacion = 'Calculador de escaños';

  ngOnInit() {
    this.onCheckUsuario();
  }

  onLogout(): void {
    this.usuariosApi.logoutUsuario();
    this.router.navigate(['']);
    // this.router.navigate(['']).then(() => location.reload());
  }

  onCheckUsuario(): void {
    if (this.usuariosApi.getCurrentUser() === null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }
}
