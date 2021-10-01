import { Observable, of, Subscription } from 'rxjs';
import { JugadoresService } from './../../services/jugadores.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Jugador } from '../../models/jugador.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { nanoid } from 'nanoid';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent implements OnInit, OnDestroy {
  jugadorSeleccionado = new Jugador();
  jugadores: Observable<Jugador[]> = of([]);
  nombreDelEquipo = '';
  idDelEquipo = '';
  formularioDeJugador = new FormGroup({});
  creando = false;
  dialogoAbierto = false;
  suscripcion!: Subscription;

  constructor(
    private jugadoresService: JugadoresService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idDelEquipo = params.idDelEquipo;
      this.nombreDelEquipo = this.route.snapshot.params.nombreDelEquipo;
      this.setFormulario();
      this.getJugadoresDelEquipo();
    });
  }

  abrirDialogo() {
    this.dialogoAbierto = true;
  }

  crearJugador() {
    this.creando = true;
    this.formularioDeJugador.controls.id.setValue(nanoid());
    this.suscripcion = this.jugadoresService
      .crearJugador(this.formularioDeJugador.value)
      .subscribe(this.suscripcionACrearJugador);
  }

  private suscripcionACrearJugador = () => {
    next: {
      this.creando = false;
      this.dialogoAbierto = false;
      this.getJugadoresDelEquipo();
    }
    error: {
      this.creando = false;
      this.dialogoAbierto = false;
    }
  };

  private getJugadoresDelEquipo() {
    this.jugadores = this.jugadoresService
      .getJugadoresDelEquipo(this.idDelEquipo)
      .pipe(shareReplay());
  }

  private setFormulario() {
    this.formularioDeJugador = this.fb.group({
      'Nombre del Jugador': ['', Validators.required],
      Avatar:
        'https://robohash.org/etconsequunturreprehenderit.png?size=250x250&set=set1',
      id: '',
      teamId: this.idDelEquipo,
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
