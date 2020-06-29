import {Request, Response} from 'express';

import pool from '../database';

class ContenedoresControlador{

	public async leerContenedores ( req: Request, res: Response): Promise<void>{
		const respuesta = await pool.query('SELECT DISTINCT id_obj AS IdBasura, max(ID) ID FROM test WHERE actualizacion IS NOT NULL GROUP BY id_obj ORDER BY id_obj asc;');
		var basurasJson = respuesta[0];
		var basuras: any = [];
		var ids: any = [];
		var idsContenedores: any = [];
		for(var i=0; i<basurasJson.length; i++){
			basuras[i] = {
				id_obj:basurasJson[i].IdBasura,
				PESO:"--",
				create_at:"--",
				ubicacion:"--",
			};
			ids[i] = basurasJson[i].ID;
			idsContenedores[i] = basurasJson[i].IdBasura
		}
		//console.log(respuesta);
		///console.log(basurasJson);
		console.log([basuras,ids,idsContenedores]);
		res.json([basuras,ids,idsContenedores]);
	}

	public async leerUltimosRegistros( req: Request, res: Response): Promise <void>{
		const { regInicial, regFinal } = req.params;
		const respuesta = await pool.query('SELECT t.id_obj, t.PESO, t.create_at, t.ubicacion  FROM (SELECT id_obj, MAX(id) as ID FROM test GROUP BY id_obj) r INNER JOIN test t ON t.id_obj = r.id_obj AND t.id = r.ID WHERE t.actualizacion IS NOT NULL AND t.id_obj>=? AND t.id_obj<=? ORDER BY t.id_obj;',[regInicial, regFinal]);
		console.log(respuesta);
		res.json(respuesta[0]);
	}
}

const contenedoresControlador = new ContenedoresControlador();
export default contenedoresControlador;