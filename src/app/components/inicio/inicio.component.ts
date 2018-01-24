import { Component, OnInit } from '@angular/core';
import { ProtocoloService } from '../../services/protocolos.service';
import { Protocolo } from '../../models/protocolo-informe';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {
  public _protocolos: Protocolo[] = [];

  constructor(private _protocoloService: ProtocoloService) { }

  ngOnInit() {
    this._protocoloService.getProtocolos()
                        .subscribe( res =>  {
                          this._protocolos = res.protocolos;
                          //this.keys = Object.keys(this._informes);
                          console.log(res);
                        },
                        error => {
                          console.log(error);
                        });
  }
}
