import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatZonasPageRoutingModule } from './stat-zonas-routing.module';

import { StatZonasPage } from './stat-zonas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatZonasPageRoutingModule
  ],
  declarations: [StatZonasPage]
})
export class StatZonasPageModule {}
