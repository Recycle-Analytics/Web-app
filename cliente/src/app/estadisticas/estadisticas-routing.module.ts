import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticasPage } from './estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasPage
  },
  {
    path: 'general',
    loadChildren: () => import('./general/general.module').then( m => m.GeneralPageModule)
  },
  {
    path: 'stat-contenedores',
    loadChildren: () => import('./stat-contenedores/stat-contenedores.module').then( m => m.StatContenedoresPageModule)
  },
  {
    path: 'stat-vehiculos',
    loadChildren: () => import('./stat-vehiculos/stat-vehiculos.module').then( m => m.StatVehiculosPageModule)
  },
  {
    path: 'stat-rutas',
    loadChildren: () => import('./stat-rutas/stat-rutas.module').then( m => m.StatRutasPageModule)
  },
  {
    path: 'stat-zonas',
    loadChildren: () => import('./stat-zonas/stat-zonas.module').then( m => m.StatZonasPageModule)
  },
  {
    path: 'cont',
    loadChildren: () => import('./cont/cont.module').then( m => m.ContPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticasPageRoutingModule {}
