import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatVehiculosPage } from './stat-vehiculos.page';

const routes: Routes = [
  {
    path: '',
    component: StatVehiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatVehiculosPageRoutingModule {}
