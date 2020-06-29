import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContenedoresService {

	API_URI = 'http://localhost:3000/api/Recyclable_Analytics/contenedores/';

  	constructor(private http: HttpClient) { }

  	getIdContenedores(){
  		var respuesta = this.http.get(this.API_URI);
  		console.log(respuesta);
  		return respuesta;
  	}

  	getRegisterContenedores(regInicial: any, regFinal: any){
 		var respuesta = this.http.get(this.API_URI + "last/" + regInicial + "/" + regFinal );
 		console.log(respuesta);
 		return respuesta;
 	}
}
