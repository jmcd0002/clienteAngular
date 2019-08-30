import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { VotacionInterfaz } from '../../../modelos/votacion-interfaz';

// Servicios
import { VotacionesApiService } from '../../../servicios/votaciones-api.service';
import { ElectionsApiService } from '../../../servicios/elections-api.service';

// Graficas
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usuario-registrado',
  templateUrl: './usuario-registrado.component.html',
  styleUrls: ['./usuario-registrado.component.css']
})
export class UsuarioRegistradoComponent implements OnInit {
  protected listaMetodos: Array<string>;

  formularioReparto: FormGroup;

  protected votacion: VotacionInterfaz;

  protected votaciones: VotacionInterfaz[];

  protected mapPartidosVotos: { [name: string]: number } = null;

  protected mapPartidosEsc: { [name: string]: number } = null;

  protected nombreVotacion = '';

  // Grafica Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: number[] = [];

  constructor(
    private votacionesApi: VotacionesApiService,
    private electionsApi: ElectionsApiService, // private location: Location
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getListVotaciones();

    this.formularioReparto = this.fb.group({
      metodo: ['Selecciona un metodo'],
      esc: [0]
    });
  }

  getListaMetodos(tipo: string): void {
    this.listaMetodos = new Array<string>();

    this.electionsApi
      .getListaMetodos(tipo)
      .subscribe(
        (listaMetodos: Array<string>) => (this.listaMetodos = listaMetodos)
      );
  }

  getListVotaciones(): void {
    this.votacionesApi
      .getListaVotaciones()
      .subscribe(
        (votaciones: VotacionInterfaz[]) => (this.votaciones = votaciones)
      );
  }

  getPartidosVotos(votacion: VotacionInterfaz): void {
    this.mapPartidosEsc = null;
    this.nombreVotacion = votacion.nombreVotacion;

    if (Object.keys(votacion.mapPartidosVotos).length > 0) {
      this.mapPartidosVotos = votacion.mapPartidosVotos;
    } else {
      this.mapPartidosVotos = null;
    }

    this.votacionesApi.setCurrentIdVotacion(votacion.idVotacion);
  }

  computarReparto(formValue: any): void {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];

    // console.log(this.mapPartidosVotos, formValue.metodo, formValue.esc);
    if (
      Object.keys(this.mapPartidosVotos).length > 0 &&
      formValue.esc > 0 &&
      formValue.metodo
    ) {
      this.electionsApi
        .computarReparto(this.mapPartidosVotos, formValue.metodo, formValue.esc)
        .subscribe((mapPartidosEsc: { [name: string]: number }) => {
          this.mapPartidosEsc = mapPartidosEsc;
          console.log(this.mapPartidosEsc);
          for (const key in mapPartidosEsc) {
            if (mapPartidosEsc.hasOwnProperty(key)) {
              this.doughnutChartLabels.push(key);
              this.doughnutChartData.push(mapPartidosEsc[key]);
            }
          }
        });
    }
  }
}
