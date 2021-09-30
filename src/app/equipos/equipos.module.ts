import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './components/equipos/equipos.component';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { JugadoresComponent } from './components/jugadores/jugadores.component';

@NgModule({
  declarations: [EquiposComponent, JugadoresComponent],
  imports: [CommonModule, EquiposRoutingModule, TableModule, AvatarModule],
})
export class EquiposModule {}
