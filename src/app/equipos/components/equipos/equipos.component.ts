import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { nanoid } from 'nanoid';
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
  creando = false;
  suscripcion!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private equiposService: EquiposService,
    private ligasService: LigasService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(nanoid());

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
    this.mostrarMensaje = true;
  }

  abrirDialogo() {
    this.dialogoAbierto = true;
  }

  crearEquipo() {
    this.creando = true;
    this.formularioDeEquipo.controls.id.setValue(nanoid());
    this.suscripcion = this.equiposService
      .crearEquipo(this.formularioDeEquipo.value)
      .subscribe(this.suscribirSeACrearEquipo);
  }

  private suscribirSeACrearEquipo = () => {
    next: {
      this.creando = false;
      this.dialogoAbierto = false;
      this.getEquipos();
    }
    error: {
      this.creando = false;
      this.dialogoAbierto = false;
    }
  };

  private getNombreDeLaLiga() {
    this.nombreDeLaLiga = this.ligasService.getNombreDeLaLiga(this.idDeLaLiga);
  }

  private getEquipos() {
    this.equipos = this.equiposService.getEquiposPorLiga(this.idDeLaLiga);
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }
}
