import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { nanoid } from 'nanoid';
import { ConfirmationService } from 'primeng/api';
import { Observable, of, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Jugador } from '../../models/jugador.model';
import { JugadoresService } from './../../services/jugadores.service';

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
  cargando = false;
  dialogoAbierto = false;
  suscripcion!: Subscription;
  suscripcionAEliminarJugador!: Subscription;

  constructor(
    private jugadoresService: JugadoresService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
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
    this.cargando = true;
    this.formularioDeJugador.controls.id.setValue(nanoid());
    this.suscripcion = this.jugadoresService
      .crearJugador(this.formularioDeJugador.value)
      .subscribe(this.suscripcionACrearJugador);
  }

  confirmarEliminarJugador(jugador: Jugador) {
    this.confirmationService.confirm({
      key: 'dialogoDeConfirmacionParaEliminar',
      message:
        'Seguro de eliminar al jugador ' + jugador['Nombre del Jugador'] + '?',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass:
        'p-button-outlined p-button-rounded p-button-danger',
      rejectButtonStyleClass: 'p-button-outlined p-button-rounded',
      accept: () => {
        this.eliminarJugador(jugador);
      },
    });
  }

  eliminarJugador(jugador: Jugador) {
    this.suscripcionAEliminarJugador = this.jugadoresService
      .eliminarJugador(jugador)
      .subscribe(this.suscipcionAEliminarJugador);
  }

  private suscipcionAEliminarJugador = () => {
    next: {
      this.getJugadoresDelEquipo();
    }
    error: {
      this.cargando = false;
      this.dialogoAbierto = false;
    }
  };

  private suscripcionACrearJugador = () => {
    next: {
      this.cargando = false;
      this.dialogoAbierto = false;
      this.getJugadoresDelEquipo();
    }
    error: {
      this.cargando = false;
      this.dialogoAbierto = false;
    }
  };

  getJugadoresDelEquipo() {
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
    this.suscripcion?.unsubscribe();
    this.suscripcionAEliminarJugador?.unsubscribe();
  }
}
