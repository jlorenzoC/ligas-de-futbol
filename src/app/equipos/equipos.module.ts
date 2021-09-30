import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './components/equipos/equipos.component';

@NgModule({
  declarations: [
    EquiposComponent
  ],
  imports: [
    CommonModule,
    EquiposRoutingModule
  ]
})
export class EquiposModule { }
