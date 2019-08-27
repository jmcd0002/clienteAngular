import { Component, OnInit } from '@angular/core';
import { UsuariosApiServiceService } from '../../../servicios/usuarios-api-service.service';
import { UsuarioInterfaz } from '../../../modelos/usuario-interfaz';
import { VotacionesApiService } from '../../../servicios/votaciones-api.service';
import { VotacionInterfaz } from '../../../modelos/votacion-interfaz';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  constructor(
    private usuarioApi: UsuariosApiServiceService,
    private votacionesApi: VotacionesApiService
  ) {}

  protected usuario: UsuarioInterfaz;

  protected votaciones: VotacionInterfaz;

  ngOnInit() {
    this.usuario = this.usuarioApi.getCurrentUser();
    this.getListVotaciones();
  }

  getListVotaciones(): void {
    this.votacionesApi
      .getListaVotaciones()
      .subscribe(
        (votaciones: VotacionInterfaz) => (this.votaciones = votaciones)
      );
  }

  onBorrarVotacion(id: string): void {
    if (confirm('¿Esta seguro de borrar esa votacion?')) {
      this.votacionesApi
        .borrarVotacion(id)
        .subscribe(data => this.getListVotaciones());
    }
    //  else {
    //   this.router.navigate(['usuario/perfil']);
    // }
  }
}
