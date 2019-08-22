import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { VotacionInterfaz } from '../../../modelos/votacion-interfaz';

// Servicios
import { VotacionesApiService } from '../../../servicios/votaciones-api.service';
import { ElectionsApiService } from '../../../servicios/elections-api.service';

// Graficas
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-usuario-registrado',
  templateUrl: './usuario-registrado.component.html',
  styleUrls: ['./usuario-registrado.component.css']
})
export class UsuarioRegistradoComponent implements OnInit {
  // Grafica Doughnut
  public doughnutChartLabels: Label[] = [];

  public doughnutChartData: number[] = [];

  public doughnutChartType: ChartType = 'doughnut';

  // Otros atributos
  protected votaciones: VotacionInterfaz[];

  protected mapPartidosVotos = new Map<string, number>();

  protected nombreVotacion = '';

  protected metodoSeleccionado = '';

  protected listaMetodos = new Array<string>();

  constructor(
    private votacionesApi: VotacionesApiService,
    private electionsApi: ElectionsApiService // private location: Location
  ) {}

  ngOnInit() {
    this.getListVotaciones();
    // this.getListaMetodos('divisor');
    this.computarReparto('Webber', 16);
  }

  getListaMetodos(tipo: string): void {
    this.listaMetodos = new Array<string>();

    this.electionsApi
      .getListaMetodos(tipo)
      .subscribe(
        (listaMetodos: Array<string>) => (this.listaMetodos = listaMetodos)
      );
    //   .subscribe((listaMetodos: Array<string>) => {
    //     for (const key in listaMetodos) {
    //     if (listaMetodos.hasOwnProperty(key)) {
    //       this.listaMetodos.push(listaMetodos[key]);
    //       // console.log(this.listaMetodos);
    //     }
    //   }
    // });
  }

  getListVotaciones(): void {
    this.votacionesApi
      .getListaVotaciones()
      .subscribe(
        (votaciones: VotacionInterfaz[]) => (this.votaciones = votaciones)
      );
  }

  getPartidosVotos(idVotacion: number, nombreVotacion: string): void {
    this.nombreVotacion = nombreVotacion;
    this.mapPartidosVotos.clear();

    this.votacionesApi
      .getPartidosVotos(idVotacion)
      .subscribe((mapPartidosVotos: { [name: string]: number }) => {
        for (const key in mapPartidosVotos) {
          if (mapPartidosVotos.hasOwnProperty(key)) {
            this.mapPartidosVotos.set(key, mapPartidosVotos[key]);
          }
        }
        this.votacionesApi.setCurrentPartidosVotos(mapPartidosVotos);
      });
  }

  computarReparto(metodoSeleccionado: string, esc: number): void {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];

    this.electionsApi
      .computarReparto(
        this.votacionesApi.getCurrentPartidosVotos(),
        metodoSeleccionado,
        esc
      )
      .subscribe((mapPartidosEsc: { [name: string]: number }) => {
        console.log(mapPartidosEsc);
        for (const key in mapPartidosEsc) {
          if (mapPartidosEsc.hasOwnProperty(key)) {
            this.doughnutChartLabels.push(key);
            this.doughnutChartData.push(mapPartidosEsc[key]);
          }
        }
      });
    localStorage.removeItem('currentMapPartidosVotos');
  }
}
