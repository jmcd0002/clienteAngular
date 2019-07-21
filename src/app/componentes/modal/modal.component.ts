import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";
import { VotacionesApiService } from "../../servicios/votaciones-api.service";
import { VotacionInterfaz } from "../../modelos/votacion-interfaz";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  constructor(
    private votacionesApi: VotacionesApiService,
    private location: Location
  ) {}

  private votacion = {
    idVotacion: "",
    nombreVotacion: ""
  };

  ngOnInit() {}

  onCrearVotacion(votacionForm: NgForm): void {
    if (
      votacionForm.value.idVotacion == null ||
      votacionForm.value.idVotacion === ""
    ) {
      // Nueva
      this.votacionesApi
        .crearVotacion(votacionForm.value.nombreVotacion)
        .subscribe(votacion => location.reload());
    } else {
      // Modificacion
      console.log("Modificacion");
    }
  }
}
