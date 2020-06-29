import { Component, OnInit, ViewChild } from '@angular/core';
import { CaminosService } from '../servicios/caminos.service';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
export class RutasPage implements OnInit {
	@ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll: IonInfiniteScroll;
	rutasEncontradas: any;
	rutasActuales: Array<any> = new Array();
	numeroScroll: any = 1;
	rutasPorScroll: any = 5;
	rutasAnadidas: any = 0;
	creandoRuta: boolean = false;
	rutaPrecreada = this.formBuilder.group({
		id_ruta:["--", [Validators.required]],
		IdVehiculo:[0],
		tiempo_estimado:[0],
		contenedores:["--",[Validators.required]],
		progreso:[0],
		Encendido:[0]
	});
	rutasParaActualizar: Array <Boolean> = new Array();
	editando: boolean = false;
	rutaPremodificada = this.formBuilder.group({
		//id_ruta:"--",
		IdVehiculo:[0]
		//contenedores:"--"
	});
	eliminando: boolean = false;
	rutasEliminadas: any = 0;
	constructor(private caminosService: CaminosService, private formBuilder: FormBuilder) { 
		this.leerRutasRegistradas(this.numeroScroll, this.rutasPorScroll, this.rutasAnadidas, this.rutasEliminadas);
	}

	ngOnInit() {
		this.caminosService.getTotalRutas().subscribe(
			res => {
				console.log(res);
				this.rutasEncontradas = res;
				console.log("Se encontraron " + this.rutasEncontradas + " rutas");
			}, 
			err => {console.log(err)}
		);
	}
	//----------------------Metodo para leer Rutas Establecidas-----------------
	leerRutasRegistradas(numScroll: any, rutasByScroll: any, rutasAdded: any, rutasSuprimed: any){
		var rutasLeidas: any = [];
		this.caminosService.getRutasRegistradas(numScroll, rutasByScroll, rutasAdded, rutasSuprimed).subscribe(
			res => {
				console.log(res);
				rutasLeidas = res;
				for(var i=1; i<=rutasLeidas.length; i++){
					this.rutasParaActualizar = this.rutasParaActualizar.concat(false);
				}
				this.rutasActuales = this.rutasActuales.concat(rutasLeidas);
			},
			err => {console.log(err)}
		)
	}

	//---------------Metodos para crear Rutas----------------------
	public crearRuta(){
		//var validacion: any;
		var confirmacion = confirm("¿Esta seguro de crear la ruta " + this.rutaPrecreada.value.id_ruta + "?");
		if(confirmacion){
			this.caminosService.idsRepetidos(this.rutaPrecreada.value.id_ruta, this.rutaPrecreada.value.IdVehiculo.toString()).subscribe(
				res => {
					var validacion: any = res;
					console.log(validacion.valid);
					if(validacion.valid){
						console.log(JSON.stringify(this.rutaPrecreada.value));
						this.caminosService.createNuevaRuta(this.rutaPrecreada.value).subscribe(
							res =>{
								this.rutasActuales.unshift(this.rutaPrecreada.value);
								this.rutasParaActualizar.unshift(false);
								this.creandoRuta = false;
								this.editando = false;
								this.rutasAnadidas++;
							},
							err =>{console.log(err)}
						)
					}else{
						alert("La ruta ya existe o el vehiculo esta asociado a otra ruta");
					}
				},
				err => {console.log(err)}
			)
		}else{
			console.log("mejor no")
		}
		console.log(this.rutaPrecreada.value.id_ruta);
	}

	get id_ruta(){
		return this.rutaPrecreada.get("id_ruta");
	}
	get IdVehiculo(){
		return this.rutaPrecreada.get("IdVehiculo");
	}
	get contenedores(){
		return this.rutaPrecreada.get("contenedores");
	}

	public errorMessages = {
		id_ruta: [{type:'required', message:'Requerido'}],
		//IdVehiculo: [{type:'values', message:'Debe estar entre 10001 y 10030'}],
		contenedores: [{type:'required', message:'Requerida'}]
	};
	cancelarCreacion(){
		this.creandoRuta = false;
		this.editando = false;
	}
	//----------------Metodo para actualizar el progreso-------------

	actualizarProgreso(rutasActualizables: any){
		var progresos: any = [];
		this.caminosService.getProgresos(rutasActualizables.toString()).subscribe(
			res => {
				progresos = res;
				for(var i=0; i<progresos.length; i++){
					this.rutasActuales[i].progreso = progresos[i].progreso;
				}
			},
			err => {console.log(err)}
		)
	}
	//----------------Metodos para modificar rutas ------------

	editarRuta(i: any){
		this.editando = true;
		this.rutasParaActualizar[i] = true;
	}
	actualizarRuta(i: any){
		this.caminosService.idsRepetidos('X',this.rutaPremodificada.value.IdVehiculo).subscribe(
			res =>{
				var validacion: any = res;
				console.log(validacion.valid);
				if(validacion.valid){
					this.caminosService.updateRuta(this.rutasActuales[i].id_ruta, this.rutaPremodificada.value).subscribe(
						res => {
							//this.rutasActuales[i].id_ruta = this.rutaPremodificada.id_ruta;
							this.rutasActuales[i].IdVehiculo = this.rutaPremodificada.value.IdVehiculo;
							//this.rutasActuales[i].contenedores = this.rutaPremodificada.contenedores;							
							this.cancelarEdicion(i);
						},
						err => {console.log(err)}	
					)
				}else{
					alert("Este Vehiculo ya tiene asociada una ruta");
				}
				
			},
			err =>{console.log(err)}
		)
	}
	get Id_Vehiculo(){
		return this.rutaPremodificada.get("IdVehiculo");
	}

	cancelarEdicion(i: any){
		this.rutasParaActualizar[i] = false;
		this.editando = false;
	}
	//-------------------Metodos para eliminar Rutas--------------------------
	eliminacion(){
		this.eliminando = true;
		this.editando = true;
	}	

	eliminarRuta(i: any){
		var rutaEliminada: any;
		var confirmacion = confirm("¿Esta seguro de eliminar la ruta " + this.rutasActuales[i].id_ruta + "?");
		if(confirmacion){
			this.caminosService.deleteRuta(this.rutasActuales[i].id_ruta).subscribe(
				res =>{
					if(res){
						rutaEliminada = this.rutasActuales.splice(i, 1);
						this.rutasParaActualizar.splice(i, 1);
						console.log(rutaEliminada);
						console.log("Ruta " + rutaEliminada.id_ruta + " eliminada.");
					}
				},
				err => {console.log(err)}
			)
		}
		this.cancelarEliminacion();
	}

	cancelarEliminacion(){
		this.eliminando = false;
		this.editando = false;
	}
	//---------------------Metodo para aumentar el Scroll---------------------
	loadOlder(event){
		setTimeout(() => {
			console.log('Done');
			this.numeroScroll++;
			this.leerRutasRegistradas(this.numeroScroll, this.rutasPorScroll, this.rutasAnadidas, this.rutasEliminadas);	
        	event.target.complete();
        	if((this.rutasActuales.length-this.rutasAnadidas+this.rutasEliminadas) == this.rutasEncontradas){
	            this.infiniteScroll.disabled = true;
        	}
		},500);
	}
}
