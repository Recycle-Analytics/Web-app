import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContPageRoutingModule } from './cont-routing.module';

import { ContPage } from './cont.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContPageRoutingModule
  ],
  declarations: [ContPage]
})
export class ContPageModule {}
