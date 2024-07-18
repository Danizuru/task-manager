import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { Navbar1Component } from './component/header/navcomponents/navbar1/navbar1.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { InterceptorService } from './servicios/interceptor.service';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivarComponent } from './component/activar/activar.component';
import { MenuComponent } from './component/menu/menu.component';
import { MisdatosComponent } from './component/misdatos/misdatos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    Navbar1Component,
    UsuariosComponent,
    ActivarComponent,
    MenuComponent,
    MisdatosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
