import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { UsuarioInterfaz } from '../modelos/usuario-interfaz';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApiServiceService {
  // usuario: Observable<any>;

  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  registrarUsuario(usuario: UsuarioInterfaz) {
    const urlApi = 'http://localhost:8080/usuario/';
    return this.http
      .post<UsuarioInterfaz>(urlApi, usuario, { headers: this.headers })
      .pipe(map(usuario => usuario));
  }

  login(nombre: string, clave: string): Observable<any> {
    const urlApi = `http://localhost:8080/usuario/${nombre}`;
    return this.http
      .post<UsuarioInterfaz>(
        urlApi,
        { nombre, clave },
        { headers: this.headers }
      )
      .pipe(map(usuario => usuario));
  }

  logoutUsuario() {
    let accessToken = localStorage.getItem('accessToken');
    // const urlApi = `http://localhost:8080/usuario/${accessToken}`; // TODO crear metodo en el servidor
    localStorage.removeItem('currentIdVotacion');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    // return this.http.post<UsuarioInterfaz>(urlApi, { headers: this.headers });
  }

  setCurrentUser(usuario: UsuarioInterfaz): void {
    let usuarioString = JSON.stringify(usuario);
    localStorage.setItem('currentUser', usuarioString);
  }

  getCurrentUser(): UsuarioInterfaz {
    let usuarioString = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(usuarioString)) {
      let usuario: UsuarioInterfaz = JSON.parse(usuarioString);
      return usuario;
    } else {
      return null;
    }
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}
