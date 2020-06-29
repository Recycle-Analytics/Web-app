import {Request, Response} from 'express'

import pool from '../database';

class IndexControlador{

	/*public async leer ( req: Request, res: Response): Promise<void>{
		const basuras = await pool.query('SELECT ID , IdVehiculo , Fecha , Hora , Peso , Humedad, Temperatura, Gas, Fuego, actualizacion FROM camiones ORDER BY ID desc;');
		res.json(basuras[0]);
	}*/

	public async leerConocidos ( req: Request, res: Response ): Promise<any>{
		const { actByScroll, numScroll, actRequested } = req.params;
		var respuesta: any = [];
		var oldRecolectores: any = [];
		var tipos: any = [];
		for(var i=0; i<parseInt(actByScroll); i++){
			var oldRecolectorVehiculo = await pool.query('SELECT * FROM camiones WHERE actualizacion=(GREATEST(IF((SELECT max(actualizacion) FROM test) IS NULL,0,(SELECT max(actualizacion) FROM test)),IF((SELECT max(actualizacion) FROM camiones) IS NULL,0,(SELECT max(actualizacion) FROM camiones)))-?-?*(?-1)-?) ORDER BY ID desc;',[ i, actByScroll, numScroll, actRequested]);
			var oldRecolectorContenedor = await pool.query('SELECT * FROM test WHERE actualizacion=(GREATEST(IF((SELECT max(actualizacion) FROM test) IS NULL,0,(SELECT max(actualizacion) FROM test)),IF((SELECT max(actualizacion) FROM camiones) IS NULL,0,(SELECT max(actualizacion) FROM camiones)))-?-?*(?-1)-?) ORDER BY ID desc;',[ i, actByScroll, numScroll, actRequested]);
			oldRecolectores = oldRecolectores.concat(oldRecolectorVehiculo[0], oldRecolectorContenedor[0]);
			if((oldRecolectorVehiculo[0].length>0) && (oldRecolectorContenedor[0].length==0)){
				tipos.push('Vehiculos');
			}else if((oldRecolectorContenedor[0].length>0) && (oldRecolectorVehiculo[0].length==0)){
				tipos.push('Contenedores');
			}else{
				console.log('algo anda mal con la peticion o no hay mas actualizaciones disponibles')
			}
		}
		console.log(oldRecolectorVehiculo[0].length);
		console.log(oldRecolectorContenedor[0].length);
		respuesta[0] = oldRecolectores;
		respuesta[1] = tipos;
		console.log(respuesta);
		return res.json(respuesta);
	}

	public async takeAct ( req: Request, res: Response ): Promise<any>{
		//optimizar codigo cuando exista la tabla basuras
		const { type } = req.params;
		if(type=="Contenedores"){
			const newRecolectorContenedor = await pool.query('SELECT * FROM test WHERE actualizacion=(SELECT max(actualizacion) FROM test) ORDER BY create_at desc;');
			return res.json(newRecolectorContenedor[0]);
		}else if(type=="Vehiculos"){
			const newRecolectorVehiculo = await pool.query('SELECT * FROM camiones WHERE actualizacion=(SELECT max(actualizacion) FROM camiones) ORDER BY ID desc;'); //
			return res.json(newRecolectorVehiculo[0]);
		}else{
			console.log("No se reconoce el tipo de objeto")
			return res.json({message: "No se reconoce el tipo de objeto"});
		}
	}

	public async giveAct (req: Request, res: Response ): Promise<void>{
		console.log("entra a give_Act");
		//optimizar codigo cuando exista la tabla basuras-
		const { type } = req.params;
		if(type=="Contenedores"){
			await pool.query('UPDATE test set actualizacion=(IF((SELECT actualizacion from camiones where id=(SELECT min(id) FROM camiones)) IS NULL AND (SELECT actualizacion from test where id=(SELECT min(id) FROM test)) IS NULL,1,IF((SELECT actualizacion from test where id=(SELECT min(id) FROM test)) IS NULL,((SELECT max(actualizacion) from camiones)+1),IF((SELECT actualizacion from camiones where id=(SELECT min(id) FROM camiones)) IS NULL,((SELECT max(actualizacion) from test)+1),(GREATEST((SELECT max(actualizacion) from test),(SELECT max(actualizacion) from camiones))+1))))) WHERE actualizacion IS NULL');
			res.json({message: "Registro Actualizado"});
		}else if(type=="Vehiculos"){
			await pool.query('UPDATE camiones set actualizacion=(IF((SELECT actualizacion from camiones where id=(SELECT min(id) FROM camiones)) IS NULL AND (SELECT actualizacion from test where id=(SELECT min(id) FROM test)) IS NULL,1,IF((SELECT actualizacion from test where id=(SELECT min(id) FROM test)) IS NULL,((SELECT max(actualizacion) from camiones)+1),IF((SELECT actualizacion from camiones where id=(SELECT min(id) FROM camiones)) IS NULL,((SELECT max(actualizacion) from test)+1),(GREATEST((SELECT max(actualizacion) from test),(SELECT max(actualizacion) from camiones))+1))))) WHERE actualizacion IS NULL');
			res.json({message: "Registro Actualizado"});
		}else{
			console.log("No se reconoce el tipo de objeto")
			res.json({message: "No se reconoce el tipo de objeto"});
		}
	}
}

export const indexControlador = new IndexControlador();