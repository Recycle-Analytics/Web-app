import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatVehiculosPageRoutingModule } from './stat-vehiculos-routing.module';

import { StatVehiculosPage } from './stat-vehiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatVehiculosPageRoutingModule
  ],
  declarations: [StatVehiculosPage]
})
export class StatVehiculosPageModule {}
