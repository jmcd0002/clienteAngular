import { Component, OnInit } from "@angular/core";
import { VotacionesApiService } from "../../../servicios/votaciones-api.service";
import { Location } from "@angular/common";
import { VotacionInterfaz } from "../../../modelos/votacion-interfaz";
import { ChartType } from "chart.js";
import { SingleDataSet, Label } from "ng2-charts";

@Component({
  selector: "app-usuario-registrado",
  templateUrl: "./usuario-registrado.component.html",
  styleUrls: ["./usuario-registrado.component.css"]
})
export class UsuarioRegistradoComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: Label[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail-Order Sales"
  ];
  public doughnutChartData: SingleDataSet = [350, 450, 100];

  public doughnutChartType: ChartType = "doughnut";

  private votaciones: VotacionInterfaz;

  private mapPartidosVotos = new Map<string, number>();

  private nombreVotacion = "";

  constructor(
    private votacionesApi: VotacionesApiService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getListVotaciones();
  }

  getListVotaciones(): void {
    this.votacionesApi
      .getListaVotaciones()
      .subscribe(
        (votaciones: VotacionInterfaz) => (this.votaciones = votaciones)
      );
  }

  getPartidosVotos(idVotacion: number, nombreVotacion: string): void {
    this.nombreVotacion = nombreVotacion;
    this.votacionesApi
      .getPartidosVotos(idVotacion)
      .subscribe(
        (mapPartidosVotos: Map<string, number>) =>
          (this.mapPartidosVotos = mapPartidosVotos)
      );
    // location.reload();
    console.log(this.mapPartidosVotos.size);
    if (this.mapPartidosVotos.size > 0) {
      this.mapPartidosVotos.forEach((value: number, key: string) => {
        console.log(key, value);
        // this.doughnutChartLabels.push(key);
        // this.doughnutChartData.push(value);
      });
    }
  }
}
