import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'vehiculos',
    loadChildren: () => import('./vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'contenedores',
    loadChildren: () => import('./contenedores/contenedores.module').then( m => m.ContenedoresPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'rutas',
    loadChildren: () => import('./rutas/rutas.module').then( m => m.RutasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
