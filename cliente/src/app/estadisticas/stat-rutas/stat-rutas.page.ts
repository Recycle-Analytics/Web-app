import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { InformacionService } from '../../servicios/informacion.service';

@Component({
  selector: 'app-stat-rutas',
  templateUrl: './stat-rutas.page.html',
  styleUrls: ['./stat-rutas.page.scss'],
})
export class StatRutasPage implements OnInit {

  constructor(private informacionService: InformacionService) { }

  InformacionEstadisticaRuta: Array<any> = [];
  IEGParcial: any;
  //ultimaActualizacion: any;
  hoverOn: Array<boolean>;
  iteracion: Array<any> = [];

  ngOnInit() {
  	this.getStatRuta(true, 0);

  	//this.iteracion[0] = setInterval(()=>{this.getStatRuta(false, 1)},1000000);
  	//this.iteracion[1] = setInterval(()=>{this.getStatRuta(false, 2)},1000000);
  }

  getStatRuta(inicio: boolean, id: number){
  	this.informacionService.getEstadisticas("rutas", id).subscribe(
  			res=>{
  				const estadisticas = res[1];
  				if(id==0){
  					this.InformacionEstadisticaRuta = estadisticas;
  					//this.ultimaActualizacion = estadisticas[0].create_at;
  				}else{
  					this.InformacionEstadisticaRuta[id-1] = estadisticas[0];
					//this.ultimaActualizacion = this.InformacionEstadisticaRuta[id-1].create_at;
					console.log(this.InformacionEstadisticaRuta[id-1]);
  				}

  				this.IEGParcial = this.InformacionEstadisticaRuta.slice(0,this.InformacionEstadisticaRuta.length);
				if(inicio){
					this.hoverOn = new Array(this.InformacionEstadisticaRuta.length);
					this.hoverOn.fill(false);
				}

  			},
  			err=>{console.log(err)}
  		);
  }


 	hideShow(i: number){
  		this.hoverOn.fill(false);
  		this.hoverOn[i] = true;
  	}

  	/*ionViewWillLeave(){
		for(var i in this.iteracion){
			clearInterval(this.iteracion[i]);
		}
	}

	ngOnDestroy(){
		for(var i in this.iteracion){
			clearInterval(this.iteracion[i]);
		}
	}*/
}
