import { ConsultaResumenDTO } from './../_model/consultaResumenDTO';
import { FiltroConsulta } from './../_model/filtroConsulta';
import { ConsultaListaExamenDTO } from './../_model/consultaListaExamenDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Consulta } from '../_model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url: string = `${environment.HOST_URL}/consultas`;

  constructor(private http: HttpClient) { }

  registrar(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }

  buscar(filtroConsulta: FiltroConsulta) {
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta);
  }

  listarResumen() {
    return this.http.get<ConsultaResumenDTO[]>(`${this.url}/listarResumen`);
  }

  generarReporte(){
    return this.http.get(`${this.url}/generarReporte`, {
      responseType: 'blob'
    });
  }

  guardarArchivo(data : File){
    let formdata: FormData = new FormData();
    formdata.append('file', data);

    return this.http.post(`${this.url}/guardarArchivo`, formdata, {
      responseType: 'text'
    });
  }

  leerArchivo(){
    return this.http.get(`${this.url}/leerArchivo/1`, {
      responseType: 'blob'
    });
  }

}
