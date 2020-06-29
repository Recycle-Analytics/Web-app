import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatRutasPageRoutingModule } from './stat-rutas-routing.module';

import { StatRutasPage } from './stat-rutas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatRutasPageRoutingModule
  ],
  declarations: [StatRutasPage]
})
export class StatRutasPageModule {}
