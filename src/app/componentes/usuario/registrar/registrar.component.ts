import { Component, OnInit } from '@angular/core';
import { UsuariosApiServiceService } from '../../../servicios/usuarios-api-service.service';
import { UsuarioInterfaz } from '../../../modelos/usuario-interfaz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  constructor(
    private usuariosApiService: UsuariosApiServiceService,
    private router: Router
  ) {}

  private usuario: UsuarioInterfaz = {
    nombre: '',
    clave: ''
  };

  ngOnInit() {}

  registrar(): void {
    this.usuariosApiService
      .registrarUsuario(this.usuario)
      .subscribe(usuario => {
        this.usuariosApiService.setCurrentUser(this.usuario);
        const token = this.usuario.nombre;
        this.usuariosApiService.setToken(token);
        this.router.navigate(['usuario']);
        // this.router.navigate(['usuario']).then(() => location.reload());
      });
  }
}
