import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatRutasPage } from './stat-rutas.page';

const routes: Routes = [
  {
    path: '',
    component: StatRutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatRutasPageRoutingModule {}
