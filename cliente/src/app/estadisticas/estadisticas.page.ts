import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from '../servicios/informacion.service';

//@IonicPage()
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

	Sections: Array<any> =[
		{
			nombre: "general",
			titulo: "General",
			url: "/estadisticas/general",
			dato: "",
			label: "",
			icono: "pie-chart-outline"
		},
		{
			nombre: "contenedores",
			titulo: "Contenedores",
			url: "/estadisticas/stat-contenedores",
			dato: "",
			label: "",
			icono: "trash-bin-outline"
		},
		{
			nombre: "vehiculos",
			titulo: "Vehiculos",
			url: "/estadisticas/stat-vehiculos",
			dato: "",
			label: "",
			icono: "bus-outline"
		},
		{
			nombre: "rutas",
			titulo: "Rutas",
			url: "/estadisticas/stat-rutas",
			dato: "",
			label: "",
			icono: "analytics-outline"
		},
		{
			nombre: "zonas",
			titulo: "Zonas",
			url: "/estadisticas/stat-zonas",
			dato: "",
			label: "",
			icono: "home-outline"
		}
	]

	iteracion: Array<any> = [];
	Ids_datos: Array<number> = [1,1,1,1,1];

	constructor(private informacionService: InformacionService) { 
		
	}

	ngOnInit() {
		
	}

	ionViewWillEnter(){
		this.iteracion[0] = setInterval(() => {this.leerEstadisticasIniciales("general", this.Ids_datos[0]);}, 2000);
		this.iteracion[1] = setInterval(() => {this.leerEstadisticasIniciales("contenedores", this.Ids_datos[1]);}, 2000);
		this.iteracion[2] = setInterval(() => {this.leerEstadisticasIniciales("vehiculos", this.Ids_datos[2]);}, 2000);
		this.iteracion[3] = setInterval(() => {this.leerEstadisticasIniciales("rutas", this.Ids_datos[3]);}, 2000);
		this.iteracion[4] = setInterval(() => {this.leerEstadisticasIniciales("zonas", this.Ids_datos[4]);}, 2000);
	}

	leerEstadisticasIniciales(categoria: String, ids: any){
		var estadisticas: any;
			this.informacionService.getEstadisticas(categoria, ids).subscribe(
				res =>{
					
					const estadistica: any = res[1][0];
					const indexCategoria: any = res[0];
					//console.log(estadistica);
					this.Sections[indexCategoria].dato = estadistica.dato;					
					this.Sections[indexCategoria].label = estadistica.label;
				},
				err =>{console.log(err)}
			)
	}

	cambiarInfo(i: number){
		this.Ids_datos[i]++;
		this.leerEstadisticasIniciales(this.Sections[i].nombre, this.Ids_datos[i]);
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
