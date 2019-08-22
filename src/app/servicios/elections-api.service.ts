import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectionsApiService {
  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getListaMetodos(tipo: string) {
    const urlApi = `http://localhost:8080/compute/metodos/${tipo}`;
    return this.http.get(urlApi);
  }

  computarReparto(
    mapPartidosVotos: { [name: string]: number },
    metodo: string,
    esc: number
  ) {
    const urlApi = `http://localhost:8080/compute/metodo/${metodo}?esc=${esc}`;
    return this.http
      .post<{ [name: string]: number }>(urlApi, mapPartidosVotos, {
        headers: this.headers
      });
  }
}
