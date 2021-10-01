import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root',
})
export class EquiposService {
  constructor(private http: HttpClient) {}

  getEquiposPorLiga(idDeLaLiga: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`teams?Liga=${idDeLaLiga}`);
  }

  crearEquipo(equipo: Equipo): Observable<any> {
    return this.http.post('teams', equipo);
  }
}
