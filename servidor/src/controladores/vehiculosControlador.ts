import {Request, Response, NextFunction} from 'express'

import pool from '../database';

class VehiculosControlador{

	public async leerVehiculos ( req: Request, res: Response): Promise<void>{
		try {
		const respuesta = await pool.query('SELECT DISTINCT IdVehiculo AS IdCamion, max(ID) ID FROM camiones WHERE actualizacion IS NOT NULL GROUP BY IdVehiculo ORDER BY IdVehiculo asc;');
		var camionesJson = respuesta[0];
		var camiones: any = [];
		var ids: any = [];
		var idsVehiculos: any = [];

		for(var i=0; i<camionesJson.length; i++){
			camiones[i] = {
				IdVehiculo:camionesJson[i].IdCamion,
				Fecha:"--",
				Hora:"--",
				Peso:"--",
				Humedad:"--",
				Temperatura:"--",
				Gas:"--",
				Fuego:"--"
			};
			ids[i] = camionesJson[i].ID;
			idsVehiculos[i] = camionesJson[i].IdCamion;
		}
		
		//console.log(respuesta);
		///console.log(camionesJson);
		console.log([camiones,ids,idsVehiculos]);
		res.json([camiones,ids,idsVehiculos]);
		}catch(err){
			console.log("WTF")
		}
	}

	public async leerUltimosRegistros( req: Request, res: Response): Promise <void>{
		const { regInicial, regFinal } = req.params;
		const respuesta = await pool.query('SELECT t.IdVehiculo, t.Fecha, t.Hora, t.Peso, t.Humedad, t.Temperatura, t.Gas, t.Fuego  FROM (SELECT IdVehiculo, MAX(id) as ID FROM camiones GROUP BY IdVehiculo) r INNER JOIN camiones t ON t.IdVehiculo = r.IdVehiculo AND t.id = r.ID WHERE t.actualizacion IS NOT NULL AND t.IdVehiculo>=? AND t.IdVehiculo<=? ORDER BY IdVehiculo;',[regInicial,regFinal]);
		console.log(respuesta);
		res.json(respuesta[0]);
	}
}

export const vehiculosControlador = new VehiculosControlador();