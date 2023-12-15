import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.url

    constructor(private http: HttpClient) {}

  public get() {
    return this.http.get<usuario[]>(`${this.url}`);
  }
}
