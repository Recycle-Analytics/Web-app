import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { InformacionService } from '../../servicios/informacion.service';

@Component({
  selector: 'app-stat-vehiculos',
  templateUrl: './stat-vehiculos.page.html',
  styleUrls: ['./stat-vehiculos.page.scss'],
})
export class StatVehiculosPage implements OnInit {

  constructor(private informacionService: InformacionService) { }

  InformacionEstadisticaVeh: Array<any> = [];
  IEGParcial: any;
  ultimaActualizacion: any;
  hoverOn: Array<boolean>;
  iteracion: Array<any> = [];

  ngOnInit() {
  	this.getStatVeh(true, 0);

  	this.iteracion[0] = setInterval(()=>{this.getStatVeh(false, 1)},10000); //100000
  	this.iteracion[1] = setInterval(()=>{this.getStatVeh(false, 2)},60000);
  }

  getStatVeh(inicio: boolean, id: number){
  	this.informacionService.getEstadisticas("vehiculos", id).subscribe(
  			res=>{
  				const estadisticas = res[1];
  				if(id==0){
  					this.InformacionEstadisticaVeh = estadisticas;
  					this.ultimaActualizacion = estadisticas[0].create_at;
  				}else{
  					this.InformacionEstadisticaVeh[id-1] = estadisticas[0];
					this.ultimaActualizacion = this.InformacionEstadisticaVeh[id-1].create_at;
					console.log(this.InformacionEstadisticaVeh[id-1]);
  				}

  				this.IEGParcial = this.InformacionEstadisticaVeh.slice(0,this.InformacionEstadisticaVeh.length);
				if(inicio){
					this.hoverOn = new Array(this.InformacionEstadisticaVeh.length);
					this.hoverOn.fill(false);
					this.showChart();
				}

  			},
  			err=>{console.log(err)}
  		);
  }

  showChart() {
    var ctx = (<any>document.getElementById('yudhatp-chart')).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
        labels: [this.InformacionEstadisticaVeh[1].titulo, "Vehiculos Apagados"],
        datasets: [{
              label: "This is chart",
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              data: [this.InformacionEstadisticaVeh[1].dato, this.InformacionEstadisticaVeh[0].dato-this.InformacionEstadisticaVeh[1].dato],
              borderWidth: 1
        }]
       }
    });
  }

 	hideShow(i: number){
  		this.hoverOn.fill(false);
  		this.hoverOn[i] = true;
  	}

  	ionViewWillLeave(){
		for(var i in this.iteracion){
			clearInterval(this.iteracion[i]);
		}
	}

	ngOnDestroy(){
		for(var i in this.iteracion){
			clearInterval(this.iteracion[i]);
		}
	}

}
