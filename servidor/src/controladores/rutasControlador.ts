import {Request, Response} from 'express'

import pool from '../database';

class RutasControlador{

	public async getTotal(req: Request, res: Response): Promise <any>{
		const totalRutas = await pool.query('SELECT id_ruta FROM rutas;');
		console.log(totalRutas[0].length);
		return res.json([totalRutas[0].length]);
	}

	public async getRutasConocidas(req: Request, res: Response): Promise <any>{
		const { rutByScroll, numScroll, rutAdd, rutSupr } = req.params;
		var rutasByScroll: number = Number(rutByScroll);
		var numeroScroll: number = Number(numScroll);
		var rutasAdd: number = Number(rutAdd);
		var rutasSupr: number = Number(rutSupr);
		var inicio: number = rutasByScroll*(numeroScroll-1)+rutasAdd-rutasSupr;
		var final: number = rutasByScroll*numeroScroll+rutasAdd-rutasSupr;
		const rutasConocidas: any = await pool.query('SELECT * FROM rutas ORDER BY id desc;');
		const rutasDeRespuesta: any = rutasConocidas[0].slice(inicio, final);
		return res.json(rutasDeRespuesta);

	}

	public async validarRepetidos(req: Request, res: Response): Promise<any>{
		const{ idR, idV } = req.params;
		console.log(idR);
		console.log(Number(idV));
		var repetidos = await pool.query('SELECT * FROM rutas WHERE id_ruta="?" OR IdVehiculo=?;', [idR, idV]);
		console.log(repetidos[0]);
		if(repetidos[0].length>0){
			res.json({valid:false});
		}else{
			res.json({valid:true});
		}
	}

	public async createRuta(req: Request, res: Response): Promise <void>{
		console.log(req.body);
		await pool.query('INSERT INTO rutas SET ?;', [req.body]);
		res.json({message:"Ruta Creada"});
	}

	public async getProgress(req: Request, res: Response): Promise <any>{
		var { rutasAct } = req.params;
		var progresos = await pool.query('SELECT progreso FROM rutas ORDER BY id desc LIMIT ?;', [rutasAct]);
		var rutasDeRespuesta = progresos[0];
		return res.json(rutasDeRespuesta);
	}
	public async updateRuta(req: Request, res: Response): Promise <void>{
		const{ idRuta } = req.params;
		await pool.query('UPDATE rutas SET ? WHERE id_ruta=?;', [req.body, idRuta]);
		res.json({message:"Ruta Modificada"});
	}
	public async destroyRuta(req: Request, res: Response): Promise <void>{
		const{ idRuta } = req.params;
		await pool.query('DELETE FROM rutas WHERE id_ruta=?;', [idRuta]);
		res.json({message:"Ruta Eliminada"});
	}	
}

export const rutasControlador = new RutasControlador();