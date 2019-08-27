import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { VotacionesApiService } from '../../servicios/votaciones-api.service';

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.css']
})
export class Modal2Component implements OnInit {
  formuarioPartidosVotos: FormGroup;
  arrayPartidosVotos: FormArray;

  constructor(
    private votacionesApiService: VotacionesApiService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formuarioPartidosVotos = this.fb.group({
      arrayPartidosVotos: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      partido: '',
      votos: ''
    });
  }

  get getInputs() {
    return this.formuarioPartidosVotos.get('arrayPartidosVotos') as FormArray;
  }

  addInputs(): void {
    this.arrayPartidosVotos = this.formuarioPartidosVotos.get(
      'arrayPartidosVotos'
    ) as FormArray;
    this.arrayPartidosVotos.push(this.createItem());
  }

  removeInputs(index: number) {
    this.arrayPartidosVotos = this.formuarioPartidosVotos.get(
      'arrayPartidosVotos'
    ) as FormArray;
    this.arrayPartidosVotos.removeAt(index);
  }

  onAddPartidoVotos(formValue: any): void {
    let mapPartidosVotos: { [name: string]: number } = {};

    for (const key in formValue.arrayPartidosVotos) {
      if (formValue.arrayPartidosVotos.hasOwnProperty(key)) {
        const partido = formValue.arrayPartidosVotos[key].partido;
        const votos = formValue.arrayPartidosVotos[key].votos;
        // mapPartidosVotos.set(partido, votos);
        Object.keys(mapPartidosVotos).push(partido);
        mapPartidosVotos[partido] = votos;
      }
    }

    const idVotacion: number = this.votacionesApiService.getCurrentIdVotacion();

    this.votacionesApiService
      .anadirPartidoVotos(idVotacion, mapPartidosVotos)
      .subscribe(data => location.reload());
  }
}
