import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
	
	API_URI = 'http://localhost:3000/api/Recyclable_Analytics/vehiculos/';

 	constructor(private http: HttpClient) { }

 	getIdVehiculos(){
 		var respuesta = this.http.get(this.API_URI);
  		console.log(respuesta);
  		return respuesta;
 	}

 	
 	getRegisterVehiculos(regInicial: any, regFinal: any){
 		var respuesta = this.http.get(this.API_URI + "last/" + regInicial + "/" + regFinal );
 		console.log(respuesta);
 		return respuesta;
 	}
}
