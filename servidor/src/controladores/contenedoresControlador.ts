import {Request, Response} from 'express';

import pool from '../database';

class ContenedoresControlador{

	public async leerContenedores ( req: Request, res: Response): Promise<void>{
		const respuesta = await pool.query('SELECT DISTINCT IdContenedor AS IdBasura, max(ID) ID FROM contenedores WHERE actualizacion IS NOT NULL GROUP BY IdContenedor ORDER BY IdContenedor asc;');
		var basurasJson = respuesta[0];
		var basuras: any = [];
		var ids: any = [];
		var idsContenedores: any = [];
		for(var i=0; i<basurasJson.length; i++){
			basuras[i] = {
				IdContenedor:basurasJson[i].IdBasura,
				Peso:"--",
				Fecha:"--",
				Direccion:"--",
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
		const respuesta = await pool.query('SELECT t.IdContenedor, t.Peso, t.Fecha, t.Direccion  FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID WHERE t.actualizacion IS NOT NULL AND t.IdContenedor>=? AND t.IdContenedor<=? ORDER BY t.IdContenedor;',[regInicial, regFinal]);
		console.log(respuesta);
		res.json(respuesta[0]);
	}
}

const contenedoresControlador = new ContenedoresControlador();
export default contenedoresControlador;