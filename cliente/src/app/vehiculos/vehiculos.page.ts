import { Component, OnInit, ViewChild } from '@angular/core';
import { HistorialService } from '../servicios/historial.service';
import { VehiculosService } from '../servicios/vehiculos.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
	@ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll: IonInfiniteScroll;
	idRegistros: any = [];
	idVehiculos: any = [];
	actualizacionDisponible: Array <Boolean> = new Array();
	ultimosRegistrosVehiculos: Array <any> = new Array();
	registrosPendientes: any = [];
	vehiculosPendientes: Array <any> = new Array();
	nuevosRegistros: any = 0;
	nuevosVehiculos: any = 0;
	vehiculosPorScroll: any = 10;
	vehiculosMostrados: any = 10;

	constructor(private vehiculosService: VehiculosService, private historialService: HistorialService) { 
		this.recopilarVehiculos(0);
	}

	ngOnInit() {
	}

	recopilarVehiculos(inicio: any){
		var ids: any = [];
		this.vehiculosService.getIdVehiculos().subscribe(
			res =>{

				ids = res;
				console.log(ids);
				var newVehiculos = ids[0].length-this.idVehiculos.length;
				if(this.idVehiculos.length<ids[0].length){
					alert("Se encontraron " + newVehiculos + " vehiculos nuevos.");
				}else if(this.idVehiculos.length>ids[0].length){
					alert("Se encontraron" + (newVehiculos*(-1)) + " vehiculos menos.");
				}
				this.nuevosVehiculos += newVehiculos;
				this.registrosPendientes = this.registrosPendientes.concat(ids[0].slice(inicio, ids[0].length));
				//console.log(this.registrosPendientes);
				//console.log(this.idRegistros);
				//console.log(this.actualizacionDisponible);
				for(var i=0; i<ids[1].length; i++){
					if(i>=inicio){
						this.idVehiculos[i] = ids[2][i]
						this.idRegistros[i] = 0;
    					this.actualizacionDisponible[i] = false;
    					this.infiniteScroll.disabled = false;
    					if(i<this.vehiculosMostrados){
    						this.ultimosRegistrosVehiculos[i] = this.registrosPendientes[i];
    					}
    				}
					if(this.idRegistros[i]!=ids[1][i]){
    					this.idRegistros[i] = ids[1][i];
    					if(!this.actualizacionDisponible[i]){
    						this.nuevosRegistros++;
    					}
    					this.actualizacionDisponible[i] = true;
    					//console.log("noto que es diferente");
    				}
				}

				console.log(this.idRegistros);
				console.log(this.actualizacionDisponible);
				//this.ultimosRegistrosVehiculos = this.registrosPendientes.slice(0,this.vehiculosPorScroll);
				console.log(this.ultimosRegistrosVehiculos);
				console.log("Termino la revision de registros");
			},
			err =>{console.log(err)}
	 	)
	}

	actualizarNuevos(tipo: String){
      var newActualizaciones: any = []

      this.historialService.setNewActualizacion(tipo).subscribe(
        res => {
          	console.log(res);  
          	this.recopilarVehiculos(this.idRegistros.length);
        },
        err => {console.log(err)}
      )
    }


    verVehiculosActualizados(regInicial: any, regFinal: any){
    	var newRegistros: any = [];
    	this.vehiculosService.getRegisterVehiculos(this.idVehiculos[regInicial], this.idVehiculos[regFinal]).subscribe(
    		res =>{
    			console.log(res);
    			newRegistros = res;
    			var count: any = 0;
    			for(var i=regInicial; i<=regFinal; i++){
		    		if(this.actualizacionDisponible[i]){
		    			this.registrosPendientes[i] = newRegistros[count];
		    			if(i<(this.vehiculosMostrados)){
		    				this.ultimosRegistrosVehiculos[i] = this.registrosPendientes[i];
		    			}
		    			this.nuevosRegistros--;
		    			this.actualizacionDisponible[i] = false;
		    		}
		    		count++;
		    	}  			
		    	console.log(this.ultimosRegistrosVehiculos);
    		},
    		err =>{console.log(err)}
    	)
    }

    loadOlder(event) {
      
      setTimeout(() => {
        console.log('Done');
        var ultimoVehiculoMostrado = this.vehiculosMostrados;
        for(var i=ultimoVehiculoMostrado; i<(ultimoVehiculoMostrado+this.vehiculosPorScroll); i++){
        	if(i<this.registrosPendientes.length){
        		this.vehiculosMostrados++;
        		this.ultimosRegistrosVehiculos[i] = this.registrosPendientes[i];
        	}
        }
        event.target.complete();
        if (this.ultimosRegistrosVehiculos.length == this.nuevosVehiculos) {
          this.infiniteScroll.disabled = true;
        }
      }, 500);
    }
}
