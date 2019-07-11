import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Especialidad } from './../_model/especialidad';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidadesCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST_URL}/especialidades`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Especialidad[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Especialidad>(`${this.url}/${id}`);
  }

  registrar(especialidad: Especialidad) {
    return this.http.post(this.url, especialidad);
  }

  modificar(especialidad: Especialidad) {
    return this.http.put(this.url, especialidad);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
