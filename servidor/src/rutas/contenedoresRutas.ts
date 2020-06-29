import { Router } from 'express';
import contenedoresControlador from '../controladores/contenedoresControlador';

class ContenedoresRutas {

	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/', contenedoresControlador.leerContenedores);
		this.router.get('/last/:regInicial/:regFinal', contenedoresControlador.leerUltimosRegistros);
	}
}

const contenedoresRutas = new ContenedoresRutas();
export default contenedoresRutas.router;