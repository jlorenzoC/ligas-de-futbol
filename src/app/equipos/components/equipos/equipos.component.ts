import { LigasService } from './../../../services/ligas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Equipo } from '../../models/equipo.model';
import { EquiposService } from './../../services/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {
  equipos: Observable<Equipo[]> = of([]);
  equipoSeleccionado = new Equipo();
  nombreDeLaLiga: Observable<string> = of('');

  constructor(
    private route: ActivatedRoute,
    private equiposService: EquiposService,
    private ligasService: LigasService
  ) {}

  ngOnInit(): void {
    const idDeLaLiga = this.route.snapshot.params.idDeLaLiga;
    this.nombreDeLaLiga = this.ligasService.getNombreDeLaLiga(idDeLaLiga);
    this.equipos = this.equiposService.getEquiposPorLiga(idDeLaLiga);
  }
}
