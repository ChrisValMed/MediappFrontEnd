import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Signos } from '../_model/signo';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignoService {

  signosCambio = new Subject<Signos[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST_URL}/signos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Signos[]>(this.url);
  }

  listarMedicoPorId(id: number) {
    return this.http.get<Signos>(`${this.url}/${id}`);
  }

  registrar(signo: Signos) {
    return this.http.post(this.url, signo);
  }

  modificar(signo: Signos) {
    return this.http.put(this.url, signo);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
