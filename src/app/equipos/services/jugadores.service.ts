import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';
import { Jugador } from '../models/jugador.model';

@Injectable({
  providedIn: 'root',
})
export class JugadoresService {
  constructor(private http: HttpClient) {}

  getJugadoresDelEquipo(idDelEquipo: string): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`players?teamId=${idDelEquipo}`);
  }

  crearJugador(jugador: Jugador): Observable<any> {
    return this.http.post('players', jugador);
  }
}
