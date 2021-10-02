import { shareReplay } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { ConfirmationService } from 'primeng/api';
import { Observable, of, Subscription } from 'rxjs';
import { Equipo } from '../../models/equipo.model';
import { Liga } from './../../../models/liga.model';
import { LigasService } from './../../../services/ligas.service';
import { EquiposService } from './../../services/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit, OnDestroy {
  equipos: Observable<Equipo[]> = of([]);
  equipoSeleccionado = new Equipo();
  nombreDeLaLiga: Observable<string> = of('');
  mostrarMensaje = true;
  dialogoAbierto = false;
  formularioDeEquipo: FormGroup = new FormGroup({});
  ligas: Liga[] = [];
  idDeLaLiga = '';
  cargando = false;
  suscripcion!: Subscription;
  creando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equiposService: EquiposService,
    private ligasService: LigasService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.idDeLaLiga = this.route.snapshot.params.idDeLaLiga;

    this.formularioDeEquipo = this.fb.group({
      'Nombre del equipo': ['', Validators.required],
      'Logo del Equipo':
        'https://robohash.org/autemvoluptatemdolorem.png?size=250x250&set=set1',
      id: '',
      Liga: this.idDeLaLiga,
    });

    this.getNombreDeLaLiga();
    this.getEquipos();
  }

  rutaActivada() {
    this.mostrarMensaje = false;
  }

  rutaDesactivada() {
    this;
    this.mostrarMensaje = true;
  }

  abrirDialogo() {
    this.dialogoAbierto = true;
  }

  crearEquipo() {
    this.cargando = true;
    this.formularioDeEquipo.controls.id.setValue(nanoid());
    this.suscripcion = this.equiposService
      .crearEquipo(this.formularioDeEquipo.value)
      .subscribe(this.suscribirSeACrearEquipo);
  }

  confirmarEliminarEquipo(equipo: Equipo, e: MouseEvent) {
    e.stopPropagation();
    this.confirmationService.confirm({
      key: 'dialogoDeConfirmacionParaEliminar',
      message:
        'Seguro de eliminar al equipo ' + equipo['Nombre del equipo'] + '?',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass:
        'p-button-outlined p-button-rounded p-button-danger',
      rejectButtonStyleClass: 'p-button-outlined p-button-rounded',
      accept: () => {
        this.eliminarEquipo(equipo);
      },
    });
  }

  onEditarEquipo(equipo: Equipo, e: MouseEvent) {
    this.formularioDeEquipo.controls['Nombre del equipo'].setValue(
      equipo['Nombre del equipo']
    );
    this.formularioDeEquipo.controls.id.setValue(equipo.id);
    this.dialogoAbierto = true;
    e.stopPropagation();
  }

  editarEquipo() {
    this.cargando = true;
    this.equiposService
      .editarEquipo(this.formularioDeEquipo.value)
      .subscribe((equipo: Equipo) => {
        this.setEstadoARespuestaExitosa();
        if (this.equipoSeleccionado?.id != null) {
          this.router.navigate([
            '/ligas',
            this.idDeLaLiga,
            'equipos',
            equipo.id,
            'jugadores',
            {
              nombreDelEquipo: equipo['Nombre del equipo'],
            },
          ]);
        }
      });
  }

  private eliminarEquipo(equipo: Equipo) {
    this.cargando = true;
    this.equiposService.eliminarEquipo(equipo).subscribe(
      (resp) => {
        this.setEstadoARespuestaExitosa();
        this.router.navigate(['/ligas', this.idDeLaLiga, 'equipos']);
      },
      (error) => this.setEstadoARespuestaConError()
    );
  }

  private setEstadoARespuestaExitosa() {
    this.cargando = false;
    this.dialogoAbierto = false;
    this.getEquipos();
  }

  private setEstadoARespuestaConError() {
    this.cargando = false;
    this.dialogoAbierto = false;
  }

  private suscribirSeACrearEquipo = () => {
    next: {
      this.setEstadoARespuestaExitosa();
    }
    error: this.setEstadoARespuestaConError();
  };

  private getNombreDeLaLiga() {
    this.nombreDeLaLiga = this.ligasService.getNombreDeLaLiga(this.idDeLaLiga);
  }

  private getEquipos() {
    this.equipos = this.equiposService
      .getEquiposPorLiga(this.idDeLaLiga)
      .pipe(shareReplay());
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }
}
