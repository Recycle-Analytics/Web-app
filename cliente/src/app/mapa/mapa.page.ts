import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MapasService } from '../servicios/mapas.service';
import { IonInfiniteScroll } from '@ionic/angular';

//import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit{
	/*map;
	@ViewChild('mapElement',  {static: true}) mapElement;*/
	@ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll: IonInfiniteScroll;

	optionsTipo: Array<any> = [
	{ 
		titulo: "Contenedor",
		nombre: "contenedores"
	},
	{
	 	titulo: "Vehiculo",
	 	nombre: "vehiculos"
	},
	{
	 	titulo: "Ruta",
	 	nombre: "rutas"
	}];
	
	identificadores: Array<any> = [
		{
			IdEntidad: 0
		}
	];
	tipoEscogido: boolean = false;
	infoLoaded: boolean = false;

	consulta = this.formBuilder.group({
		tipo: ["", [Validators.required]],
		id: [{value: "", disabled: true}, [Validators.required]]
	});

	informacion: any = {
		Dato: ""
	};

	//switchMap: boolean = true;
	mapa: SafeResourceUrl;

    constructor(private domSatizer: DomSanitizer, private formBuilder: FormBuilder, private mapasService: MapasService) {  }

    ngOnInit(){
    	this.mapa = this.domSatizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.8705530709394!2d-74.11054407056804!3d4.7002436945156845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b4e4de6c577%3A0x905332cfa4610bda!2sCra.%2092%20%2372a-60%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1593373621522!5m2!1ses!2sco");
    }

    consultarIds(event){
    	console.log(this.consulta.get("tipo").value);
    	this.mapasService.getIdentificadores(this.consulta.get("tipo").value).subscribe(
    		res =>{
    			var ids: any = res;
    			this.identificadores = ids;
    			console.log(this.identificadores);
    			this.tipoEscogido = true;
    		},
    		err=>{console.log(err)}
    	);
    }

    get tipo(){
		return this.consulta.get("tipo");
	}
	get id(){
		return this.consulta.get("id");
	}

  	public errorMessages = {
		tipo: [{type:'required', message:'Requerido'}],
		id: [{type:'required', message:'Requerida'}]
	};

	consultar(){
		var urlMap: string;
		this.mapasService.getContenido(this.consulta.get("tipo").value, this.consulta.get("id").value).subscribe(
			res =>{
				var informacionUtil = res[1];
				urlMap = res[0].toString();
				this.informacion = informacionUtil[0];
				this.mapa = this.domSatizer.bypassSecurityTrustResourceUrl(urlMap);
				this.infoLoaded = true;
				console.log(res);
			},
			err =>{console.log(err)}
		);

		//setTimeout(()=>{						this.switchMap = true;},2000);
	}

	loadOlder(event){
		event.target.complete();
		this.infiniteScroll.disabled = this.infoLoaded;
	}
}
