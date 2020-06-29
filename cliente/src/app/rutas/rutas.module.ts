import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutasPageRoutingModule } from './rutas-routing.module';

import { RutasPage } from './rutas.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    RutasPageRoutingModule
  ],
  declarations: [RutasPage]
})
export class RutasPageModule {}
