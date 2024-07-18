import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { ActivarComponent } from './component/activar/activar.component';
import { MisdatosComponent } from './component/misdatos/misdatos.component';

const routes: Routes = [
  {path:"", component:LoginComponent, pathMatch:"full"},
  {path:"registro", component:RegistroComponent, pathMatch:"full"},
  {path:"usuarios", component:UsuariosComponent, pathMatch:"full"},
  {path:"activar", component:ActivarComponent, pathMatch:"full"},
  {path:"misdatos", component:MisdatosComponent, pathMatch:"full"},
  {path:"activar/:correo/:codigo", component:ActivarComponent, pathMatch:"full"},
  
  ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
