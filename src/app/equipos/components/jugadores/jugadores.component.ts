import { Observable, of } from 'rxjs';
import { JugadoresService } from './../../services/jugadores.service';
import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../models/jugador.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent implements OnInit {
  jugadorSeleccionado = new Jugador();
  jugadores: Observable<Jugador[]> = of([]);
  nombreDelEquipo = '';

  constructor(
    private jugadoresService: JugadoresService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idDelEquipo = params.idDelEquipo;
      this.nombreDelEquipo = this.route.snapshot.params.nombreDelEquipo;
      this.jugadores = this.jugadoresService.getJugadoresDelEquipo(idDelEquipo);
    });
  }
}
