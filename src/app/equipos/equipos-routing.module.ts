import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'equipos' },
  { path: 'equipos', component: EquiposComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposRoutingModule {}
