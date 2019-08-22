import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HeroComponent } from './componentes/hero/hero.component';
import { VotacionComponent } from './componentes/votacion/votacion.component';
import { RegistrarComponent } from './componentes/usuario/registrar/registrar.component';

import { LoginComponent } from './componentes/usuario/login/login.component';
import { PerfilComponent } from './componentes/usuario/perfil/perfil.component';
import { UsuarioRegistradoComponent } from './componentes/usuario/usuario-registrado/usuario-registrado.component';
import { UsuariNoRegistradoComponent } from './componentes/usuario/usuari-no-registrado/usuari-no-registrado.component';
import { ModalComponent } from './componentes/modal/modal.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Servicios
import { VotacionesApiService } from './servicios/votaciones-api.service';
import { UsuariosApiServiceService } from './servicios/usuarios-api-service.service';
import { ElectionsApiService } from './servicios/elections-api.service';

// Graficos
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeroComponent,
    VotacionComponent,
    RegistrarComponent,
    LoginComponent,
    PerfilComponent,
    UsuarioRegistradoComponent,
    UsuariNoRegistradoComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    VotacionesApiService,
    UsuariosApiServiceService,
    ElectionsApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
