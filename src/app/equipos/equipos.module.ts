import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './components/equipos/equipos.component';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [EquiposComponent],
  imports: [CommonModule, EquiposRoutingModule, TableModule, AvatarModule],
})
export class EquiposModule {}
