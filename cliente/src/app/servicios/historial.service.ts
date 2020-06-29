import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

	API_URI = 'http://localhost:3000/api/Recyclable_Analytics/last/';
  	constructor(private http: HttpClient) { }

  	getOldActualizacion(actByScroll: String, numScroll: String, actRequested: String){
  		var respuesta = this.http.get(this.API_URI + actByScroll + '/' + numScroll + '/' + actRequested);
  		console.log(respuesta);
  		return respuesta;
  	}

  	getNewActualizacion(type: String){
  		var respuesta = this.http.get(this.API_URI + type);
  		console.log(respuesta);
  		return respuesta;
  	}

  	setNewActualizacion(type: String){
  		console.log("entra al servicio");
  		return this.http.put(this.API_URI + type,{});
  	}
}
