import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { InformacionService } from '../../servicios/informacion.service';

@Component({
  selector: 'app-stat-contenedores',
  templateUrl: './stat-contenedores.page.html',
  styleUrls: ['./stat-contenedores.page.scss'],
})
export class StatContenedoresPage implements OnInit {

  constructor(private informacionService: InformacionService) { }

  InformacionEstadisticaCont: Array<any> = [];
  IEGParcial: any;
  ultimaActualizacion: any;
  hoverOn: Array<boolean>;
  iteracion: Array<any> = [];

  ngOnInit() {
  	this.getStatCont(true, 0);

  	this.iteracion[0] = setInterval(()=>{this.getStatCont(false, 1)},2000);
  	this.iteracion[1] = setInterval(()=>{this.getStatCont(false, 2)},20000);
  }

  getStatCont(inicio: boolean, id: number){
  	this.informacionService.getEstadisticas("contenedores", id).subscribe(
  			res=>{
  				const estadisticas = res[1];
  				if(id==0){
  					this.InformacionEstadisticaCont = estadisticas;
  					this.ultimaActualizacion = estadisticas[0].create_at;
  				}else{
  					this.InformacionEstadisticaCont[id-1] = estadisticas[0];
					this.ultimaActualizacion = this.InformacionEstadisticaCont[id-1].create_at;
					console.log(this.InformacionEstadisticaCont[id-1]);
  				}

  				this.IEGParcial = this.InformacionEstadisticaCont.slice(0,this.InformacionEstadisticaCont.length-1);
				if(inicio){
					this.hoverOn = new Array(this.InformacionEstadisticaCont.length);
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
        labels: [this.InformacionEstadisticaCont[1].titulo, "Contenedores con espacio disponible"],
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
              data: [this.InformacionEstadisticaCont[1].dato, 100-this.InformacionEstadisticaCont[1].dato],
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
