import { Component, OnInit } from '@angular/core';
import { UsuariosApiServiceService } from '../../../servicios/usuarios-api-service.service';
import { UsuarioInterfaz } from '../../../modelos/usuario-interfaz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private usuariosApiService: UsuariosApiServiceService,
    private router: Router
  ) {}

  private usuario: UsuarioInterfaz = {
    nombre: '',
    clave: ''
  };

  ngOnInit() {}

  onLogin() {
    return this.usuariosApiService
      .login(this.usuario.nombre, this.usuario.clave)
      .subscribe(
        usuario => {
          this.usuariosApiService.setCurrentUser(usuario);
          const token = usuario.nombre;
          this.usuariosApiService.setToken(token);
          this.router.navigate(['usuario']);
        },
        error => console.log(error)
      );
  }
}
