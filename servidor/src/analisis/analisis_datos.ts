import pool from '../database';
import listaDatosEstadisticos from './listaDatosEstadisticos';

class AnalisisDatos {
	constructor(){}

	m2Ciudad: number = listaDatosEstadisticos.metrosCuadradosCiudad;
	capMaxCont: number = listaDatosEstadisticos.capacidadMaxContenedores;
	margFullCont: number = listaDatosEstadisticos.margenDeContenedoreLLeno;
	dTime: number = listaDatosEstadisticos.deltaTime;
	barrCub: number = listaDatosEstadisticos.barriosCubiertos;
	locCub: number = listaDatosEstadisticos.localidadesCubiertas;

	public async actualizarEstadistica(stat: String): Promise<void>{
		console.log('Actualizacion de ' + stat);
		switch (stat){
			//General
			case "Pc_T_Ocupado": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(t.Peso)*100/(COUNT(t.IdContenedor)*?) FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID),1) WHERE nombre=?;', [analisisDatos.capMaxCont, stat]);
				break;
			case "Tn_T_Recogidas": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(Peso)/1000 FROM camiones WHERE descarga=1),1) WHERE nombre=?', [stat]);
				break;
			case "Ts_N_Recoleccion": // OJO, Dependencia de la propia tabla de estadisticas
				await pool.query('UPDATE estadisticas SET dato=ROUND((((SELECT SUM(t.Peso)/1000 FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID)-(SELECT dato FROM estadisticas WHERE nombre="Tn_T_Ocupadas"))/?),1) WHERE nombre=?', [analisisDatos.dTime, stat]);
				break;
			case "Tn_T_Moviendose": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(t.Peso)/1000  FROM (SELECT IdVehiculo, MAX(id) as ID FROM camiones GROUP BY IdVehiculo) r INNER JOIN camiones t ON t.IdVehiculo = r.IdVehiculo AND t.id = r.ID WHERE t.Encendido=1),1) WHERE nombre=?', [stat]);
				break;
			case "Ds_Contenedores": 
				await pool.query('UPDATE estadisticas SET dato=ROUND(((SELECT COUNT(DISTINCT(IdContenedor)) FROM contenedores)/?),1) WHERE nombre=?', [analisisDatos.m2Ciudad, stat]);
				break;
			case "Tn_T_Ocupadas": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(t.Peso)/1000 FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID),1) WHERE nombre=?', [stat]);
				break;
			//Contenedores
			case "Cnt_T_Funcionando": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((SELECT COUNT(DISTINCT(IdContenedor)) FROM contenedores),1) WHERE nombre=?', [stat]);
				break;
			case "Pc_Cnt_Llenos": 
				await pool.query('UPDATE estadisticas SET dato=ROUND(((SELECT COUNT(t.IdContenedor) FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID WHERE t.Peso>?)*100/(SELECT COUNT(DISTINCT(IdContenedor)) FROM contenedores)),1) WHERE nombre=?', [analisisDatos.margFullCont, stat]);
				break;
			//Vehiculos
			case "Vh_T_Disponibles": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((SELECT COUNT(DISTINCT(IdVehiculo)) FROM camiones),1) WHERE nombre=?', [stat]);
				break;
			case "Vh_T_Operando": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(t.Peso)/1000  FROM (SELECT IdVehiculo, MAX(id) as ID FROM camiones GROUP BY IdVehiculo) r INNER JOIN camiones t ON t.IdVehiculo = r.IdVehiculo AND t.id = r.ID WHERE t.Encendido=1),1) WHERE nombre=?', [stat]);
				break;
			//Rutas
			case "Rt_T_Establecidas": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((SELECT COUNT(DISTINCT(id_ruta)) FROM rutas),1) WHERE nombre=?', [stat]);
				break;
			case "Pm_Cnt_Ruta": 
				await pool.query('UPDATE estadisticas SET dato=ROUND(((SELECT SUM(LENGTH(REPLACE(contenedores, ",", "")))/3 FROM rutas)/(SELECT COUNT(DISTINCT(id_ruta)) FROM rutas)),1) WHERE nombre=?', [stat]);
				break;
			//Zonas
			case "Br_T_Cubiertos": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((?),1) WHERE nombre=?', [analisisDatos.barrCub, stat]);
				break;
			case "Lc_T_Cubiertas": 
				await pool.query('UPDATE estadisticas SET dato=ROUND((?),1) WHERE nombre=?', [analisisDatos.locCub, stat]);
				break;
		}		
		//const respuesta = await pool.query('SELECT Peso FROM contenedores');
		//console.log(respuesta);
		//return respuesta;
	}

	/*public async writeNewDato(Dato: any, nombre: String, addHistorial: boolean): Promise<void>{
		var actualizacion = await pool.query('UPDATE estadisticas SET ? WHERE nombre=?;', [Dato, nombre]);
		//console.log(actualizacion);
		if(addHistorial){
			console.log('manda a otra tabla');
		}
	}*/

}

const analisisDatos = new AnalisisDatos();

export default analisisDatos;