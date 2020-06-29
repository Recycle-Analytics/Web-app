import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaminosService {

	API_URI = 'http://localhost:3000/api/Recyclable_Analytics/rutas/';

  	constructor(private http: HttpClient) { }

  	getTotalRutas(){
  		var respuesta = this.http.get(this.API_URI);
  		console.log(respuesta);
  		return respuesta;
  	}

  	getRutasRegistradas(numScroll: any, rutasByScroll: any, rutasAdded: any, rutasSuprimed: any){
  		var respuesta = this.http.get(this.API_URI + rutasByScroll + '/' + numScroll + '/' + rutasAdded + '/' + rutasSuprimed);
  		console.log(respuesta);
  		return respuesta;
  	}

  	createNuevaRuta(rutaNew: any){
  		return this.http.post(this.API_URI, rutaNew);
  	}

  	idsRepetidos(idRuta: any, idVehiculo: any){
  		return this.http.get(this.API_URI + "repeat/" + idRuta + "/" + idVehiculo);
  	}

  	getProgresos(rutActualizables: any){
  		var respuesta = this.http.get(this.API_URI + 'progress/' + rutActualizables);
  		console.log(respuesta);
  		return respuesta;
  	}

  	updateRuta(idRuta: String, rutaUp: any){
  		return this.http.put(this.API_URI + idRuta, rutaUp);
  	}

  	deleteRuta(idRuta: String){
  		return this.http.delete(this.API_URI + idRuta);
  	}
}
