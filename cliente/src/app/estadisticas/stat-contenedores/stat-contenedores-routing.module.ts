import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatContenedoresPage } from './stat-contenedores.page';

const routes: Routes = [
  {
    path: '',
    component: StatContenedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatContenedoresPageRoutingModule {}
