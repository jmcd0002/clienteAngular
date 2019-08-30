import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { VotacionInterfaz } from '../../../modelos/votacion-interfaz';

// Servicios
import { ElectionsApiService } from '../../../servicios/elections-api.service';

// Graficas
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-usuari-no-registrado',
  templateUrl: './usuari-no-registrado.component.html',
  styleUrls: ['./usuari-no-registrado.component.css']
})
export class UsuariNoRegistradoComponent implements OnInit {
  protected listaMetodos: Array<string>;

  formularioReparto: FormGroup;

  arrayPartidosVotos: FormArray;

  protected mapPartidosVotos: { [name: string]: number } = null;

  protected mapPartidosEsc: { [name: string]: number } = null;

  // Grafica Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: number[] = [];

  constructor(
    private electionsApi: ElectionsApiService, // private location: Location
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.mapPartidosVotos = null;

    this.mapPartidosEsc = null;

    this.formularioReparto = this.fb.group({
      metodo: ['Selecciona un metodo'],
      esc: [0],
      arrayPartidosVotos: this.fb.array([this.createItem()])
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

  createItem(): FormGroup {
    return this.fb.group({
      partido: '',
      votos: ''
    });
  }

  get getInputs() {
    return this.formularioReparto.get('arrayPartidosVotos') as FormArray;
  }

  addInputs(): void {
    this.arrayPartidosVotos = this.formularioReparto.get(
      'arrayPartidosVotos'
    ) as FormArray;
    this.arrayPartidosVotos.push(this.createItem());
  }

  removeInputs(index: number) {
    this.arrayPartidosVotos = this.formularioReparto.get(
      'arrayPartidosVotos'
    ) as FormArray;
    this.arrayPartidosVotos.removeAt(index);
  }

  computarReparto(formValue: any): void {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];

    this.mapPartidosVotos = {};

    for (const key in formValue.arrayPartidosVotos) {
      if (formValue.arrayPartidosVotos.hasOwnProperty(key)) {
        const partido = formValue.arrayPartidosVotos[key].partido;
        const votos = formValue.arrayPartidosVotos[key].votos;
        // mapPartidosVotos.set(partido, votos);
        Object.keys(this.mapPartidosVotos).push(partido);
        this.mapPartidosVotos[partido] = votos;
      }
    }

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
