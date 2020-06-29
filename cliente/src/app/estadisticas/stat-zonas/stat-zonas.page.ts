import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { InformacionService } from '../../servicios/informacion.service';

@Component({
  selector: 'app-stat-zonas',
  templateUrl: './stat-zonas.page.html',
  styleUrls: ['./stat-zonas.page.scss'],
})
export class StatZonasPage implements OnInit {

  constructor(private informacionService: InformacionService) { }

  InformacionEstadisticaZona: Array<any> = [];
  IEGParcial: any;
  //ultimaActualizacion: any;
  hoverOn: Array<boolean>;
  iteracion: Array<any> = [];

  ngOnInit() {
  	this.getStatZona(true, 0);

  	//this.iteracion[0] = setInterval(()=>{this.getStatZona(false, 1)},1000000);
  	//this.iteracion[1] = setInterval(()=>{this.getStatZona(false, 2)},1000000);
  }

  getStatZona(inicio: boolean, id: number){
  	this.informacionService.getEstadisticas("zonas", id).subscribe(
  			res=>{
  				const estadisticas = res[1];
  				if(id==0){
  					this.InformacionEstadisticaZona = estadisticas;
  					//this.ultimaActualizacion = estadisticas[0].create_at;
  				}else{
  					this.InformacionEstadisticaZona[id-1] = estadisticas[0];
					//this.ultimaActualizacion = this.InformacionEstadisticaZona[id-1].create_at;
					console.log(this.InformacionEstadisticaZona[id-1]);
  				}

  				this.IEGParcial = this.InformacionEstadisticaZona.slice(0,this.InformacionEstadisticaZona.length);
				if(inicio){
					this.hoverOn = new Array(this.InformacionEstadisticaZona.length);
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
