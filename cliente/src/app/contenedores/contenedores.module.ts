import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContenedoresPageRoutingModule } from './contenedores-routing.module';

import { ContenedoresPage } from './contenedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContenedoresPageRoutingModule
  ],
  declarations: [ContenedoresPage]
})
export class ContenedoresPageModule {}
