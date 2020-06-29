import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  API_URI = 'http://localhost:3000/api/Recyclable_Analytics/estadisticas/';

    constructor(private http: HttpClient) { }

    getEstadisticas(categoria: String, ids: any){
    	var respuesta = this.http.get(this.API_URI + categoria + "/" + ids.toString());
    	console.log("respuesta");
    	return respuesta;
    }
}
