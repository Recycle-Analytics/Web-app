import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatContenedoresPageRoutingModule } from './stat-contenedores-routing.module';

import { StatContenedoresPage } from './stat-contenedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatContenedoresPageRoutingModule
  ],
  declarations: [StatContenedoresPage]
})
export class StatContenedoresPageModule {}
