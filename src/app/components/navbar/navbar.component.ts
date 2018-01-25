import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  
  public usuario: Usuario;
  
  constructor(public _usuarioService: UsuariosService) { }

  ngOnInit() {
    this._usuarioService.getUsuario( this._usuarioService.id )
                        .subscribe( res => {
                          this.usuario = res.usuario
                          console.log( this.usuario );
                        },
                        error => {
                          
                        });
  }

}
