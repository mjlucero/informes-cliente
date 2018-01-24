import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Protocolo } from '../models/protocolo-informe';
import { GLOBAL } from '../global';

import { ProtocoloResponse } from '../models/response';


@Injectable()
export class ProtocoloService {

  constructor(private _http: HttpClient) { }

  getProtocolos() {
    return this._http.get< ProtocoloResponse >(GLOBAL.protocolos);
  }

  getProtocolo(id: string) {
    const uri =  `${GLOBAL.protocolo}${id}` ;
    return this._http.get< ProtocoloResponse >(uri);
  }

  saveProtocolo( protocolo: Protocolo) {
    const uri = `${GLOBAL.crearEditarProtocolo}`;

    // let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" }); , { headers}

    return this._http.post< ProtocoloResponse >( uri, protocolo);
  }

  updateProtocolo( protocolo: Protocolo) {
    const uri = `${GLOBAL.crearEditarProtocolo}`;

    return this._http.put< ProtocoloResponse >( uri, protocolo);
  }
}