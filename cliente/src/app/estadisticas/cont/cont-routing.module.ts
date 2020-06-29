import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContPage } from './cont.page';

const routes: Routes = [
  {
    path: '',
    component: ContPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContPageRoutingModule {}
