import { Router } from 'express';

import { mapasControlador } from '../controladores/mapasControlador';

class MapasRutas {

	public router: Router = Router();

	constructor(){
		this.config();
	}
//dd
	config(): void{
		this.router.get('/:tipo', mapasControlador.getIds);
		this.router.get('/:tipo/:id', mapasControlador.getInfo);
	}
}

const mapasRutas = new MapasRutas();
export default mapasRutas.router;