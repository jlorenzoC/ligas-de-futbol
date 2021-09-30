import { LigasComponent } from './components/ligas/ligas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ligas' },
  { path: 'ligas', component: LigasComponent },
  {
    path: 'ligas/:idDeLaLiga',
    loadChildren: () =>
      import('./equipos/equipos.module').then((m) => m.EquiposModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
