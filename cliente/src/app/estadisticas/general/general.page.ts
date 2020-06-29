import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { InformacionService } from '../../servicios/informacion.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {

  constructor(private informacionService: InformacionService) { }

  InformacionEstadisticaGeneral: any;
  IEGParcial: any;
  ultimaActualizacion: any;
  hoverOn: Array<boolean>;
  iteracion: Array<any> = [];

  ngOnInit() {
  	this.getStatGeneral(true, 0);

  	this.iteracion[0] = setInterval(()=>{this.getStatGeneral(false, 1)},2000);
  	this.iteracion[1] = setInterval(()=>{this.getStatGeneral(false, 2)},20000);
  	this.iteracion[2] = setInterval(()=>{this.getStatGeneral(false, 3)},2000);
  	this.iteracion[3] = setInterval(()=>{this.getStatGeneral(false, 4)},2000);
  	this.iteracion[4] = setInterval(()=>{this.getStatGeneral(false, 5)},10000);
  	this.iteracion[5] = setInterval(()=>{this.getStatGeneral(false, 6)},2000);
  }

  getStatGeneral(inicio: boolean, id: number){
  	this.informacionService.getEstadisticas("general", id).subscribe(
  			res=>{
  				const estadisticas = res[1];
  				if(id==0){
  					this.InformacionEstadisticaGeneral = estadisticas;
  					this.ultimaActualizacion = estadisticas[0].create_at;
  				}else{
  					this.InformacionEstadisticaGeneral[id-1] = estadisticas[0];
					this.ultimaActualizacion = this.InformacionEstadisticaGeneral[id-1].create_at;
					console.log(this.InformacionEstadisticaGeneral[id-1]);
  				}

  				this.IEGParcial = this.InformacionEstadisticaGeneral.slice(1,this.InformacionEstadisticaGeneral.length);
				if(inicio){
					this.hoverOn = new Array(this.IEGParcial.length);
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
        labels: [this.InformacionEstadisticaGeneral[0].titulo, "Espacio Ocupado de Contenedores"],
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
              data: [this.InformacionEstadisticaGeneral[0].dato, 100-this.InformacionEstadisticaGeneral[0].dato],
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
