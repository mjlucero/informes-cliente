import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _throw } from 'rxjs/observable/throw';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from '../../models/usuario';
import { GLOBAL } from '../../global';

import { UsuarioResponse } from '../../models/response';
import { Router } from '@angular/router';

declare var swal: any;

@Injectable()
export class UsuariosService {

  usuario: Usuario;
  token: string;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  getUsuarios() {
    return this._http.get< UsuarioResponse >(GLOBAL.usuarios);
  }

  getUsuario(id: string) {
    const uri = `${GLOBAL.usuario}${id}`;
    return this._http.get< UsuarioResponse >(uri);
  }

  saveUser(usuario: Usuario) {
    const uri = `${GLOBAL.crearEditarUsuario}`;
    let headers: HttpHeaders = new HttpHeaders({"Authorization": localStorage.getItem('token') }); 
    return this._http.post< UsuarioResponse >( uri, usuario, { headers });
  }

  updateUser(usuario: Usuario) {
    const uri = `${GLOBAL.crearEditarUsuario}`;
    let headers: HttpHeaders = new HttpHeaders({"Authorization": localStorage.getItem('token') }); 
    return this._http.put< UsuarioResponse >( uri, usuario, { headers });
  }


  login( usuario: Usuario, recordar: boolean) {
    const uri = `${GLOBAL.login}`;
    
    return this._http.post( uri, usuario)
                     .map( (res: any) => {
                    
                      this.guardarStorage(res.usuario._id, res.token, res.usuario);
                      return true;

                     }).catch ( err => {
                        console.log( err.message )

                        if (err.error.message) {
                          swal('Error en el ingreso', err.error.message, 'error');
                        } else {
                          swal('Error en el ingreso', 'La api del servidor no esta conectada', 'error');
                        }
                        //console.log( err.error.message )
                        return _throw ( err );
                     })
  }
                     

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);
  }

  defaultPass(usuario: Usuario) {
    const uri = `${GLOBAL.defaultPass }`;
    let headers: HttpHeaders = new HttpHeaders({"Authorization": localStorage.getItem('token') }); 
    return this._http.post< UsuarioResponse >( uri, usuario, { headers });
  }

  sendEmailReset(email: string) {
    const uri = `${GLOBAL.resetPass }`;
    let body = { email: email};
    return this._http.post< UsuarioResponse >( uri, body);
  }

  changePassToken(newpass: string, token: string) {
    const uri = `${GLOBAL.changePassToken }`;
    let body = { newpass : newpass, token: token};
    return this._http.post< UsuarioResponse >(uri, body);
  }

  changePass( email: string, oldpass: string, newpass: string) {
    const uri = `${GLOBAL.changePass }`;
    let headers: HttpHeaders = new HttpHeaders({"Authorization": localStorage.getItem('token') }); 
    let body = { email: email, oldpass: oldpass, newpass: newpass};
    return this._http.post< UsuarioResponse >(uri, body, { headers });
  }
}
