import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRutas from './rutas/indexRutas';
import contenedoresRutas from './rutas/contenedoresRutas';
import vehiculosRutas from './rutas/vehiculosRutas';
import rutasRutas from './rutas/rutasRutas';
import estadisticasRutas from './rutas/estadisticasRutas';
import mapasRutas from './rutas/mapasRutas';

import listaDatosEstadisticos from './analisis/listaDatosEstadisticos';
import analisisDatos from './analisis/analisis_datos';

class Servidor {

	public aplicacion: Application;

	constructor() {
		this.aplicacion = express();
		this.config();
		this.routes();
		this.setAnalisis();
	}

	config(): void{
		this.aplicacion.set('port', process.env.PORT || 3000);
		this.aplicacion.use(morgan('dev'));
		this.aplicacion.use(cors());
		this.aplicacion.use(express.json());
		this.aplicacion.use(express.urlencoded({extended: false}));
	}

	routes(): void{
		this.aplicacion.use('/api/Recyclable_Analytics/last', indexRutas);
		this.aplicacion.use('/api/Recyclable_Analytics/contenedores', contenedoresRutas);
		this.aplicacion.use('/api/Recyclable_Analytics/vehiculos', vehiculosRutas);
		this.aplicacion.use('/api/Recyclable_Analytics/rutas', rutasRutas);		
		this.aplicacion.use('/api/Recyclable_Analytics/estadisticas', estadisticasRutas);
		this.aplicacion.use('/api/Recyclable_Analytics/mapas', mapasRutas);
	}

	start(): void{
		this.aplicacion.listen(this.aplicacion.get('port'), () => {
			console.log('Servidor en puerto', this.aplicacion.get('port'));
		});
	}

	setAnalisis(): void{
		listaDatosEstadisticos.crearTablaEstadistica(listaDatosEstadisticos.lista).then(result=>{console.log("acabo")});
		setInterval(() => {analisisDatos.actualizarEstadistica("Pc_T_Ocupado")}, 2000);
		setInterval(() => {analisisDatos.actualizarEstadistica("Tn_T_Recogidas")}, 20000);			
		setInterval(() => {analisisDatos.actualizarEstadistica("Ts_N_Recoleccion");
						  analisisDatos.actualizarEstadistica("Tn_T_Ocupadas");}, 2000);
		setInterval(() => {analisisDatos.actualizarEstadistica("Tn_T_Moviendose")}, 2000);
		setInterval(() => {analisisDatos.actualizarEstadistica("Ds_Contenedores")}, 10000); //1000000
		setInterval(() => {analisisDatos.actualizarEstadistica("Cnt_T_Funcionando")}, 10000); //1000000
		setInterval(() => {analisisDatos.actualizarEstadistica("Pc_Cnt_Llenos")}, 2000);
		setInterval(() => {analisisDatos.actualizarEstadistica("Vh_T_Disponibles")}, 10000);//1000000
		setInterval(() => {analisisDatos.actualizarEstadistica("Vh_T_Operando")}, 2000);
		analisisDatos.actualizarEstadistica("Rt_T_Establecidas"); //"Rt_T_Establecidas" se actualiza con los Controladores de rutas
		analisisDatos.actualizarEstadistica("Pm_Cnt_Ruta"); //"Pm_Cnt_Ruta" se actualiza con los Controladores de rutas
		analisisDatos.actualizarEstadistica("Br_T_Cubiertos"); //"Br_T_Cubiertos" Se actualiza con los Controladores de estadisticas
		analisisDatos.actualizarEstadistica("Lc_T_Cubiertas"); //"Lc_T_Cubiertas" Se actualiza con los Controladores de estadisticas
	}
}

const servidor = new Servidor();
servidor.start();