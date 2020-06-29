import { Component, OnInit, ViewChild } from '@angular/core';
import { HistorialService } from '../servicios/historial.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll: IonInfiniteScroll;

	cardsActualizaciones: Array<any> = new Array();
  headersTipo: Array<any> = new Array();
  actualizacionesByScroll: any = 5;
  numeroDeActualizacion: any = 1;
  actualizacionesRequeridas: any = 0;

  	constructor(private historialService: HistorialService) { 
      this.actualizarViejos();
    }

    splitActualizaciones(arrayObjs: any){
      var actualizacionesDivididas: any = [];
      var regInicial = 0;
      var regFinal =0;
      var actRevisada = arrayObjs[0].actualizacion;
      for(var i=0; i<arrayObjs.length; i++){
        if(arrayObjs[i].actualizacion!=actRevisada){
          actualizacionesDivididas.push(arrayObjs.slice(regInicial,regFinal));
          regInicial = i;
          actRevisada = arrayObjs[i].actualizacion;
        }
        regFinal++;
        if(i==arrayObjs.length-1){
           actualizacionesDivididas.push(arrayObjs.slice(regInicial,regFinal)); 
        }
      }
      console.log("respuesta organizada:");
      console.log(actualizacionesDivididas);
      return actualizacionesDivididas;
    }

    detectActExistente(arrayObjs: any, type: String){
      console.log(arrayObjs[0]);
      console.log(this.cardsActualizaciones[0][0]);
      var lastTipoDetectado = true;
      var indice = 0;
      while(lastTipoDetectado){
        if(this.headersTipo[indice]!=type){
          indice++;
        }else{
          lastTipoDetectado=false;
        }
      }
      if(arrayObjs[0].actualizacion == this.cardsActualizaciones[indice][0].actualizacion){
        return false;
      }else{
        return true;
      }
    }

  	ngOnInit() {
      
      
    }

    actualizarNuevos(tipo: String){
      var newActualizaciones: any = []

      this.historialService.setNewActualizacion(tipo).subscribe(
        res => {
          console.log(res);
          this.historialService.getNewActualizacion(tipo).subscribe(
            res => {
              console.log(res);
              newActualizaciones = res;
              if(this.detectActExistente(newActualizaciones, tipo)){
                console.log("Detecto Nueva Actalizacion de " + tipo);
                this.cardsActualizaciones.unshift(newActualizaciones);
                this.actualizacionesRequeridas++;
                this.headersTipo.unshift(tipo);
              }else{
                console.log("No hay nuevos registros para actualizar");
              }
            },
            err => console.log(err)
          )  
        },
        err => {console.log(err)}
      )
    }
    


    actualizarViejos(){
      var oldsActualizaciones: any = [];
      this.historialService.getOldActualizacion(this.actualizacionesByScroll.toString(), this.numeroDeActualizacion.toString(), this.actualizacionesRequeridas.toString()).subscribe(
        res => {
          oldsActualizaciones = res;
          if(oldsActualizaciones[0].length>0){
            console.log(oldsActualizaciones);
            this.cardsActualizaciones = this.cardsActualizaciones.concat(this.splitActualizaciones(oldsActualizaciones[0]));
            this.headersTipo = this.headersTipo.concat(oldsActualizaciones[1]);
          }else{
            console.log("No hay anteriores registros para actualizar");
          }
          console.log(this.cardsActualizaciones);
        },
        err => console.log(err)
      )
    }

    loadOlder(event) {
      
      setTimeout(() => {
        console.log('Done');
        this.numeroDeActualizacion++;
        this.actualizarViejos();
        event.target.complete();
        if (this.cardsActualizaciones.length == this.cardsActualizaciones[0][0].actualizacion) {
          this.infiniteScroll.disabled = true;
        }
      }, 500);
    }
}
