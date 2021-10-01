import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './components/equipos/equipos.component';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [EquiposComponent, JugadoresComponent],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    TableModule,
    AvatarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    TooltipModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
})
export class EquiposModule {}
