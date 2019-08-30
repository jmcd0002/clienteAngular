import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { RegistrarComponent } from './componentes/usuario/registrar/registrar.component';
import { LoginComponent } from './componentes/usuario/login/login.component';
import { PerfilComponent } from './componentes/usuario/perfil/perfil.component';
import { UsuarioRegistradoComponent } from './componentes/usuario/usuario-registrado/usuario-registrado.component';
import { AutenticacionGuard } from './seguridad/autenticacion.guard';
import { UsuariNoRegistradoComponent } from './componentes/usuario/usuari-no-registrado/usuari-no-registrado.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'simulacion', component: UsuariNoRegistradoComponent },
  { path: 'usuario/registrar', component: RegistrarComponent },
  { path: 'usuario/login', component: LoginComponent },
  {
    path: 'usuario/perfil',
    component: PerfilComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'usuario',
    component: UsuarioRegistradoComponent,
    canActivate: [AutenticacionGuard]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
