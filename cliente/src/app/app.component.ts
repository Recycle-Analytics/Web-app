import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  Menu: Array<any>=[
  {
    Nombre:"Inicio",
    icono:"home",
    src:"",
    url:"/home",
  },
  {
    Nombre:"Mapa",
    icono:"earth-outline",
    src:"",
    url:"/mapa",
  },
  {
    Nombre:"Estadísticas",
    icono:"stats-chart-outline",
    src:"",
    url:"/estadisticas",
  },
  {  
    Nombre:"Rutas",
    icono:"analytics-outline",
    src:"",
    url:"/rutas",
  },
  {
    Nombre:"Contenedores",
    icono:"trash-bin-outline",
    src:"",
    url:"/contenedores",
  },
  {
    Nombre:"Vehículos",
    icono:"",
    src:"assets/icon/trash-truck-outline.svg",
    url:"/vehiculos",
  },
  {
    Nombre:"Historial",
    icono:"time-outline",
    src:"",
    url:"/historial",
  }
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
