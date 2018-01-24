import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { APP_ROUTING } from './app.routes';

import { InformeComponent } from './components/informe/informe.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { ProtocolosComponent } from './components/protocolos/protocolos.component';
import { ProtocoloComponent } from './components/protocolos/protocolo.component';

import { ProtocoloService } from './services/protocolos.service';
import { InformesService } from './services/informes.service';
import { UsuariosService } from './services/usuarios.service';
import { UploadService } from "./services/upload.service";

import { Decode64Pipe } from './pipes/decode64.pipe';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    InformeComponent,
    AdminComponent,
    UsuariosComponent,
    UsuarioComponent,
    ProtocolosComponent,
    ProtocoloComponent,
    Decode64Pipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    ProtocoloService,
    UsuariosService,
    UploadService,
    InformesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
