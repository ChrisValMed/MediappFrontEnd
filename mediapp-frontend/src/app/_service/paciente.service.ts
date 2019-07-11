import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../_model/paciente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST_URL}/pacientes`;

  constructor(private http: HttpClient) { }

  listar() {  
    return this.http.get<Paciente[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarPorId(idPaciente: number) {
    return this.http.get<Paciente>(`${this.url}/${idPaciente}`);
  }

  registrar(paciente: Paciente) {
    return this.http.post(`${this.url}`, paciente);
  }

  modificar(paciente: Paciente) {
    return this.http.put(`${this.url}`, paciente);
  }

  eliminar(idPaciente: number) {
    return this.http.delete(`${this.url}/${idPaciente}`);
  }
}
