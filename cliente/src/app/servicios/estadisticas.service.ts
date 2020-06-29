import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

	API_URI = 'http://localhost:3000/api/Recyclable_Analytics/estadisticas/';

    constructor(private http: HttpClient) { }

    getEstadisticas(ids: any){
    	console.log(typeof ids);
    }

}
