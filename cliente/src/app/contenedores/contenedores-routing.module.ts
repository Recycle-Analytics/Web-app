import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContenedoresPage } from './contenedores.page';

const routes: Routes = [
  {
    path: '',
    component: ContenedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContenedoresPageRoutingModule {}
