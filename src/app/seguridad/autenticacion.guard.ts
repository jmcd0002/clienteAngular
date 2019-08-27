import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosApiServiceService } from '../servicios/usuarios-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  constructor(
    private usuariosApi: UsuariosApiServiceService,
    private router: Router
  ) {}

  canActivate() {
    if (this.usuariosApi.getCurrentUser()) {
      // login true
      return true;
    } else {
      this.router.navigate(['usuario/login']);
      return false;
    }
  }
}
