import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { VotacionComponent } from './componentes/votacion/votacion.component';
import { RegistrarComponent } from './componentes/usuario/registrar/registrar.component';
import { LoginComponent } from './componentes/usuario/login/login.component';
import { PerfilComponent } from './componentes/usuario/perfil/perfil.component';
import { UsuarioRegistradoComponent } from './componentes/usuario/usuario-registrado/usuario-registrado.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'usuario/registrar', component: RegistrarComponent },
  { path: 'usuario/login', component: LoginComponent },
  { path: 'usuario/perfil', component: PerfilComponent },
  { path: 'usuario', component: UsuarioRegistradoComponent },
  { path: 'usuario/votacion/:idVotacion', component: VotacionComponent } // TODO: solo usuario registrados
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
