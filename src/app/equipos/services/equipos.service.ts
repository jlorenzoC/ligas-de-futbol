import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { Equipo } from '../models/equipo.model';
import { Jugador } from '../models/jugador.model';
import { JugadoresService } from './jugadores.service';

@Injectable({
  providedIn: 'root',
})
export class EquiposService {
  constructor(
    private http: HttpClient,
    private jugadoresService: JugadoresService
  ) {}

  getEquiposPorLiga(idDeLaLiga: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`teams?Liga=${idDeLaLiga}`);
  }

  crearEquipo(equipo: Equipo): Observable<any> {
    return this.http.post('teams', equipo);
  }

  eliminarEquipo(equipo: Equipo): Observable<any> {
    return this.jugadoresService.getJugadoresDelEquipo(equipo.id).pipe(
      map((jugadores: Jugador[]) =>
        this.getForkJoinDeObservablesParaEliminarJugadoresYEquipo(
          jugadores,
          equipo
        )
      ),
      mergeAll()
    );
  }

  editarEquipo(equipo: Equipo): Observable<any> {
    return this.http.put(`teams/${equipo.id}`, equipo);
  }

  private getForkJoinDeObservablesParaEliminarJugadoresYEquipo = (
    jugadores: Jugador[],
    equipo: Equipo
  ): Observable<any> => {
    const observablesQueEliminanAJugadores = [];
    for (const jugador of jugadores) {
      observablesQueEliminanAJugadores.push(
        this.jugadoresService.eliminarJugador(jugador)
      );
    }
    return forkJoin([
      observablesQueEliminanAJugadores,
      this.http.delete('teams/' + equipo.id),
    ]);
  };
}
