import { Component, OnInit, ViewChild } from '@angular/core';
import { HistorialService } from '../servicios/historial.service';
import { ContenedoresService } from '../servicios/contenedores.service';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.page.html',
  styleUrls: ['./contenedores.page.scss'],
})
export class ContenedoresPage implements OnInit {
	@ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll: IonInfiniteScroll;
	idContenedores: any = [];
	idRegistros: any = [];
	actualizacionDisponible: Array <Boolean> = new Array();
	ultimosRegistrosContenedores: Array <any> = new Array();
	registrosPendientes: any = [];
	contenedoresPendientes: Array <any> = new Array();
	nuevosRegistros: any = 0;
	nuevosContenedores: any = 0;
	contenedoresPorScroll: any = 10;
	contenedoresMostrados: any = 10;

	constructor(private contenedoresService: ContenedoresService, private historialService: HistorialService) { 
		this.recopilarContenedores(0);
	}

	ngOnInit() {
	}

	recopilarContenedores(inicio: any){
		var ids: any = [];
		this.contenedoresService.getIdContenedores().subscribe(
			res =>{

				ids = res;
				console.log(ids);
				var newContenedores = ids[0].length-this.idContenedores.length;
				if(this.idContenedores.length<ids[0].length){
					alert("Se encontraron " + newContenedores + " contenedores nuevos.");
				}else if(this.idContenedores.length>ids[0].length){
					alert("Se encontraron" + (newContenedores*(-1)) + " contenedores menos.");
				}
				this.nuevosContenedores += newContenedores;
				this.registrosPendientes = this.registrosPendientes.concat(ids[0].slice(inicio, ids[0].length));
				//console.log(this.registrosPendientes);
				//console.log(this.idContenedores);
				//console.log(this.actualizacionDisponible);
				for(var i=0; i<ids[1].length; i++){
					if(i>=inicio){
						this.idContenedores[i] = ids[2][i]; 
						this.idRegistros[i] = 0;
    					this.actualizacionDisponible[i] = false;
    					this.infiniteScroll.disabled = false;
    					if(i<this.contenedoresMostrados){
    						this.ultimosRegistrosContenedores[i] = this.registrosPendientes[i];
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
				//this.ultimosRegistrosContenedores = this.registrosPendientes.slice(0,this.contenedoresPorScroll);
				console.log(this.ultimosRegistrosContenedores);
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
          	this.recopilarContenedores(this.idContenedores.length);
        },
        err => {console.log(err)}
      )
    }


    verContenedoresActualizados(regInicial: any, regFinal: any){
    	var newRegistros: any = [];
    	this.contenedoresService.getRegisterContenedores(this.idContenedores[regInicial], this.idContenedores[regFinal]).subscribe(
    		res =>{
    			console.log(res);
    			newRegistros = res;
    			var count: any = 0;
    			for(var i=regInicial; i<=regFinal; i++){
		    		if(this.actualizacionDisponible[i]){
		    			this.registrosPendientes[i] = newRegistros[count];
		    			if(i<(this.contenedoresMostrados)){
		    				this.ultimosRegistrosContenedores[i] = this.registrosPendientes[i];
		    			}
		    			this.nuevosRegistros--;
		    			this.actualizacionDisponible[i] = false;
		    		}
		    		count++;
		    	}  			
		    	console.log(this.ultimosRegistrosContenedores);
    		},
    		err =>{console.log(err)}
    	)
    }

    loadOlder(event) {
      
      setTimeout(() => {
        console.log('Done');
        var ultimoContenedorMostrado = this.contenedoresMostrados;
        for(var i=ultimoContenedorMostrado; i<(ultimoContenedorMostrado+this.contenedoresPorScroll); i++){
        	if(i<this.registrosPendientes.length){
        		this.contenedoresMostrados++;
        		this.ultimosRegistrosContenedores[i] = this.registrosPendientes[i];
        	}
        }
        event.target.complete();
        if (this.ultimosRegistrosContenedores.length == this.nuevosContenedores) {
          this.infiniteScroll.disabled = true;
        }
      }, 500);
    }
}
