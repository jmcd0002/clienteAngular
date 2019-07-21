import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";

import { UsuarioInterfaz } from '../modelos/usuario-interfaz';

@Injectable({
  providedIn: "root"
})
export class UsuariosApiServiceService {
  usuario: Observable<any>;

  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registrarUsuario(usuario: UsuarioInterfaz) {
    const url_api = "http://localhost:8080/usuario/";
    return this.http
      .post<UsuarioInterfaz>(url_api, usuario, { headers: this.headers })
      .pipe(map(usuario => usuario));
  }

  login(nombre: string, clave: string): Observable<any> {
    const url_api = `http://localhost:8080/usuario/${nombre}`;
    return this.http
      .post<UsuarioInterfaz>(
        url_api,
        { nombre, clave },
        { headers: this.headers }
      )
      .pipe(map(usuario => usuario));
  }

  logoutUsuario() {
    let accessToken = localStorage.getItem("accessToken");
    //const url_api = `http://localhost:8080/usuario/${accessToken}`; // TODO crear metodo en el servidor
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    //return this.http.post<UsuarioInterfaz>(url_api, { headers: this.headers });
  }

  setCurrentUser(usuario: UsuarioInterfaz): void {
    let usuario_string = JSON.stringify(usuario);
    localStorage.setItem("currentUser", usuario_string);
  }

  getCurrentUser(): UsuarioInterfaz {
    let usuario_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(usuario_string)) {
      let usuario: UsuarioInterfaz = JSON.parse(usuario_string);
      return usuario;
    } else {
      return null;
    }
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }
}
