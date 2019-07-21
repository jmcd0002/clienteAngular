import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/observable";
import { map } from "rxjs/operators";

import { VotacionInterfaz } from "../modelos/votacion-interfaz";

import { UsuariosApiServiceService } from "./usuarios-api-service.service";

@Injectable({
  providedIn: "root"
})
export class VotacionesApiService {
  constructor(
    private http: HttpClient,
    private usuariosApiServiceService: UsuariosApiServiceService
  ) {}

  //votaciones: Observable<any>;
  //votacion: Observable<any>;

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
    //,Usuario: this.usuariosApiServiceService.getToken()
  });

  getListaVotaciones() {
    //const url_api = "http://localhost:8080/votacion/usuario/pepe";
    let usuario = this.usuariosApiServiceService.getCurrentUser();
    const url_api = `http://localhost:8080/votacion/usuario/${usuario.nombre}`;
    return this.http.get(url_api);
  }

  getVotacion(id: string) {
    const url_api = `http://localhost:8080/votacion/${id}`;
    //return (this.votacion = this.http.get(url_api));
    return this.http.get(url_api);
  }

  crearVotacion(nombreVotacion: string) {
    // TODO obtener token
    // TODO not null
    const usuario = this.usuariosApiServiceService.getCurrentUser();
    const url_api = `http://localhost:8080/votacion/${nombreVotacion}/usuario/${usuario.nombre}`;
    return this.http
      .post<VotacionInterfaz>(url_api, { headers: this.headers })
      .pipe(map(votacion => votacion));
  }

  modificarVotacion(votacion: VotacionInterfaz) {
    // TODO obtener token
    // TODO not null
    let usuario = this.usuariosApiServiceService.getCurrentUser();
    const url_api = `http://localhost:8080/votacion/${usuario.nombre}`;
    return this.http
      .put<VotacionInterfaz>(url_api, votacion, { headers: this.headers })
      .pipe(map(votacion => votacion));
  }

  borrarVotacion(id: string) {
    // TODO obtener token
    // TODO not null
    let usuario = this.usuariosApiServiceService.getCurrentUser();
    const url_api = `http://localhost:8080/votacion/${id}`;
    return this.http
      .delete<VotacionInterfaz>(url_api, { headers: this.headers })
      .pipe(map(votacion => votacion));
  }

  getPartidosVotos(id: number) {
    // TODO obtener token
    // TODO not null
    let usuario = this.usuariosApiServiceService.getCurrentUser();
    const url_api = `http://localhost:8080/votacion/${id}/partido`;
    return this.http.get(url_api);
  }
}
