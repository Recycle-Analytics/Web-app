import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  constructor(private http: HttpClient) { }

  	API_URI = 'http://localhost:3000/api/Recyclable_Analytics/mapas/';

  	getIdentificadores(tipo: String){
  		var respuesta = this.http.get(this.API_URI + tipo);
  		console.log(respuesta);
  		return respuesta;
  	}

  	getContenido(tipo: String, id: any){
  		var respuesta = this.http.get(this.API_URI + tipo + "/" + id.toString());
  		console.log(respuesta);
  		return respuesta;
  	}
}
