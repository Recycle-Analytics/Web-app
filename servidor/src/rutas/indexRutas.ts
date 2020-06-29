import { Router } from 'express';

import { indexControlador } from '../controladores/indexControlador';

class IndexRutas {

	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		//this.router.get('/', indexControlador.leer);
		this.router.get('/:actByScroll/:numScroll/:actRequested', indexControlador.leerConocidos);
		this.router.get('/:type', indexControlador.takeAct);
		this.router.put('/:type', indexControlador.giveAct);
	}
}

const indexRutas = new IndexRutas();
export default indexRutas.router;