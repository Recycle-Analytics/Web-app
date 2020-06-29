import { Request, Response } from 'express'
import listaDatosEstadisticos from '../analisis/listaDatosEstadisticos';

import pool from '../database';

class EstadisticasControlador{

	public async getEstadisticas(req: Request, res: Response): Promise<any>{
		const { category, id } = req.params;

		// Segun los casos de cada categoria (ver Tabla)---------
		const datosPorCategoria: Array<number> = listaDatosEstadisticos.countDatosCategorias(); 
		const categorias: Array<string> = ["general", "contenedores", "vehiculos", "rutas", "zonas"];
		//-------------------------------------------------------

		
		//---Formacion de Script SQL para condicionar la peticion-----------
		var datosEstadisticos: Array<any> = [];
		var mascara: Array<any> = [4,2,2,2,2];
		var indexCategoria: number = categorias.indexOf(category);

		if(Number(id)!=0){				
			var nombre: string = estadisticasControlador.getNombreInfo(category,((Number(id)-1)%datosPorCategoria[indexCategoria]+1));
			var respuesta = await pool.query('SELECT nombre, titulo, dato, unidad, label, create_at FROM estadisticas WHERE nombre=? ORDER BY orden;', [nombre]);
			var datos = respuesta[0];
			datosEstadisticos = datosEstadisticos.concat(datos[0]);
		}else{
			for(var j=1; j<=datosPorCategoria[indexCategoria]; j++){
				var nombre: string = estadisticasControlador.getNombreInfo(category,j);
				var respuesta = await pool.query('SELECT * FROM estadisticas WHERE nombre=? ORDER BY orden;', [nombre]);
				var datos = respuesta[0];
				datosEstadisticos = datosEstadisticos.concat(datos[0]);
			}
		}
		//-------------------------------------------------------------------------
		//console.log(datosEstadisticos);
		return res.json([indexCategoria, datosEstadisticos]);
	}




	//--------------Tabla para hallar Datos Estadisticos--------------------------
	getNombreInfo(categoria: String, id_cat: number): any {
		switch(categoria){
			case "general": switch (id_cat) {
					case 1:	return "Pc_T_Ocupado"; break;
					case 2:	return "Tn_T_Recogidas"; break;
					case 3:	return "Ts_N_Recoleccion"; break;
					case 4:	return "Tn_T_Moviendose"; break;
					case 5: return "Ds_Contenedores"; break;
					case 6: return "Tn_T_Ocupadas"; break;
				} break;
			case "contenedores": switch (id_cat) {
					case 1: return "Cnt_T_Funcionando";	break;
					case 2: return "Pc_Cnt_Llenos";	break;				
				} break;
			case "vehiculos": switch (id_cat) {
					case 1:	return "Vh_T_Disponibles"; break;
					case 2:	return "Vh_T_Operando"; break;				
				} break;
			case "rutas": switch (id_cat) {
					case 1:	return "Rt_T_Establecidas"; break;
					case 2:	return "Pm_Cnt_Ruta"; break;				
				} break;
			case "zonas": switch (id_cat) {
					case 1: return "Br_T_Cubiertos"; break;
					case 2: return "Lc_T_Cubiertas"; break;			
				} break;
			default: return "Cat_No_Encontrada"; break;
		}	
	}
}

export const estadisticasControlador = new EstadisticasControlador();