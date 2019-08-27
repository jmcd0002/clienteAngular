import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';

import { VotacionInterfaz } from '../modelos/votacion-interfaz';

import { UsuariosApiServiceService } from './usuarios-api-service.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class VotacionesApiService {
  constructor(
    private http: HttpClient,
    private usuariosApiServiceService: UsuariosApiServiceService
  ) {}

  // votaciones: Observable<any>;
  // votacion: Observable<any>;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
    // ,Usuario: this.usuariosApiServiceService.getToken()
  });

  getListaVotaciones() {
    let usuario = this.usuariosApiServiceService.getCurrentUser();
    const urlApi = `http://localhost:8080/votacion/usuario/${usuario.nombre}`;
    return this.http.get(urlApi);
  }

  getVotacion(id: string) {
    const urlApi = `http://localhost:8080/votacion/${id}`;
    // return (this.votacion = this.http.get(urlApi));
    return this.http.get(urlApi);
  }

  crearVotacion(nombreVotacion: string) {
    // TODO obtener token
    // TODO not null
    const usuario = this.usuariosApiServiceService.getCurrentUser();
    const urlApi = `http://localhost:8080/votacion/${nombreVotacion}/usuario/${usuario.nombre}`;
    return this.http
      .post<VotacionInterfaz>(urlApi, { headers: this.headers })
      .pipe(map(votacion => votacion));
  }

  // modificarVotacion(votacion: VotacionInterfaz) {
  //   // TODO obtener token
  //   // TODO not null
  //   let usuario = this.usuariosApiServiceService.getCurrentUser();
  //   const urlApi = `http://localhost:8080/votacion/${usuario.nombre}`;
  //   return this.http
  //     .put<VotacionInterfaz>(urlApi, votacion, { headers: this.headers })
  //     .pipe(map(votacion => votacion));
  // }

  borrarVotacion(id: string) {
    // TODO obtener token
    // TODO not null
    // let usuario = this.usuariosApiServiceService.getCurrentUser();
    const urlApi = `http://localhost:8080/votacion/${id}`;
    return this.http
      .delete<VotacionInterfaz>(urlApi, { headers: this.headers })
      .pipe(map(votacion => votacion));
  }

  getPartidosVotos(id: number) {
    // TODO obtener token
    // TODO not null
    // let usuario = this.usuariosApiServiceService.getCurrentUser();
    const urlApi = `http://localhost:8080/votacion/${id}/partido`;
    return this.http.get(urlApi);
  }

  anadirPartidoVotos(
    idVotacion: number,
    mapPartidosVotos: { [name: string]: number }
  ) {
    const urlApi = `http://localhost:8080/votacion/${idVotacion}/partido`;
    console.log(urlApi, mapPartidosVotos);

    return this.http.post<{ [name: string]: number }>(
      urlApi,
      mapPartidosVotos,
      {
        headers: this.headers
      }
    );
  }

  setCurrentIdVotacion(idVotacion: number): void {
    const idVotacionString = JSON.stringify(idVotacion);
    localStorage.setItem('currentIdVotacion', idVotacionString);
  }

  getCurrentIdVotacion(): number {
    const idVotacionString = localStorage.getItem('currentIdVotacion');
    if (!isNullOrUndefined(idVotacionString)) {
      const idVotacion: number = JSON.parse(idVotacionString);
      return idVotacion;
    }
  }

  // setCurrentPartidosVotos(mapPartidosVotos: { [name: string]: number }): void {
  //   let mapPartidosVotosString = JSON.stringify(mapPartidosVotos);
  //   localStorage.setItem('currentMapPartidosVotos', mapPartidosVotosString);
  // }

  // getCurrentPartidosVotos(): { [name: string]: number } {
  //   let mapPartidosVotosString = localStorage.getItem(
  //     'currentMapPartidosVotos'
  //   );
  //   if (!isNullOrUndefined(mapPartidosVotosString)) {
  //     let mapPartidosVotos: { [name: string]: number } = JSON.parse(
  //       mapPartidosVotosString
  //     );
  //     return mapPartidosVotos;
  //   } else {
  //     return null;
  //   }
  // }
}
