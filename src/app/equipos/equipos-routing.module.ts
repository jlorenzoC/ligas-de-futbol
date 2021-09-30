import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'equipos' },
  {
    path: 'equipos',
    component: EquiposComponent,
    children: [
      { path: ':idDelEquipo/jugadores', component: JugadoresComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposRoutingModule {}
