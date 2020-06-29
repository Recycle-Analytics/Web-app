import { Router } from 'express';

import { estadisticasControlador } from '../controladores/estadisticasControlador';

class EstadisticasRutas {

	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/:category/:id', estadisticasControlador.getEstadisticas);
		//this.router.get('//:ids', estadisticasControlador.getByCategorias);
	}
}

const estadisticasRutas = new EstadisticasRutas();
export default estadisticasRutas.router;