import { Router } from 'express';

import { rutasControlador } from '../controladores/rutasControlador';

class RutasRutas {

	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/', rutasControlador.getTotal);
		this.router.get('/:rutByScroll/:numScroll/:rutAdd/:rutSupr', rutasControlador.getRutasConocidas);
		this.router.get('/repeat/:idR/:idV', rutasControlador.validarRepetidos);
		this.router.post('/', rutasControlador.createRuta);
		this.router.get('/progress/:rutasAct', rutasControlador.getProgress);
		this.router.put('/:idRuta', rutasControlador.updateRuta);
		this.router.delete('/:idRuta', rutasControlador.destroyRuta);
	}
}

const rutasRutas = new RutasRutas();
export default rutasRutas.router;