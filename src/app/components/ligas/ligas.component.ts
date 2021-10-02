import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, mergeAll, shareReplay, tap } from 'rxjs/operators';
import { Jugador } from 'src/app/equipos/models/jugador.model';
import { Liga } from '../../models/liga.model';
import { Equipo } from './../../equipos/models/equipo.model';
import { EquiposService } from './../../equipos/services/equipos.service';
import { JugadoresService } from './../../equipos/services/jugadores.service';
import { LigasService } from './../../services/ligas.service';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.scss'],
})
export class LigasComponent implements OnInit, OnDestroy {
  ligas: Observable<Liga[]> = of([]);
  buscarFichaDelJugador = false;
  jugadorSeleccionado = new Jugador();
  jugadoresFiltrados: Jugador[] = [];
  equipoDelJugador = new Equipo();
  ligaDelJugador = new Liga();
  mostrarFicha = false;
  fotoDelJugadorSeleccionado = '';
  suscripcion!: Subscription;
  nombreDelJugadorSeleccionado = '';

  constructor(
    private ligasService: LigasService,
    private jugadorService: JugadoresService,
    private equiposService: EquiposService
  ) {}

  ngOnInit(): void {
    this.ligas = this.ligasService.getLigas().pipe(shareReplay());
  }

  filtrarJugadores(event: any) {
    this.jugadorService
      .filtrarJugadoresPorNombre(event.query)
      .subscribe((jugadores: Jugador[]) => {
        this.jugadoresFiltrados = jugadores;
      });
  }

  setFichaDelJugador() {
    this.fotoDelJugadorSeleccionado = this.jugadorSeleccionado.Avatar;
    this.nombreDelJugadorSeleccionado =
      this.jugadorSeleccionado['Nombre del Jugador'];
    this.suscripcion = this.equiposService
      .getEquipoPorId(this.jugadorSeleccionado.teamId)
      .pipe(
        tap(this.setEquipoDelJUgadorFiltrado),
        map(this.getLiga),
        mergeAll()
      )
      .subscribe((ligas) => {
        this.ligaDelJugador = ligas[0];
        this.mostrarFicha = true;
      });
  }

  mostrarLaFichaDelJugador() {
    if (this.mostrarFicha) {
      this.mostrarFicha = false;
      this.jugadorSeleccionado = new Jugador();
    }
  }

  private getLiga = (equipos: Equipo[]) => {
    return this.ligasService.getLiga(equipos[0].Liga);
  };

  private setEquipoDelJUgadorFiltrado = (equipos: Equipo[]) => {
    this.equipoDelJugador = equipos[0];
  };

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }
}
