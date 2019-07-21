import { Component, OnInit } from "@angular/core";
import { VotacionesApiService } from "../../servicios/votaciones-api.service";
import { VotacionInterfaz } from "../../modelos/votacion-interfaz";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-votacion",
  templateUrl: "./votacion.component.html",
  styleUrls: ["./votacion.component.css"]
})
export class VotacionComponent implements OnInit {
  constructor(
    private votacionesApi: VotacionesApiService,
    private route: ActivatedRoute
  ) {}

  private votacion: VotacionInterfaz;

  private mapPartidosVotos: { [name: string]: number };

  ngOnInit() {
    const idVotacion = this.route.snapshot.params["idVotacion"];
    this.getVotacion(idVotacion);
    //this.getPartidosVotos(idVotacion);
  }

  getVotacion(idVotacion: string) {
    this.votacionesApi
      .getVotacion(idVotacion)
      .subscribe((votacion: VotacionInterfaz) => (this.votacion = votacion));
  }

  // getPartidosVotos(idVotacion: number) {
  //   this.votacionesApi
  //     .getPartidosVotos(idVotacion)
  //     .subscribe(
  //       (mapPartidosVotos: { [name: string]: number }) =>
  //         (this.mapPartidosVotos = mapPartidosVotos)
  //     );
  // }
}
