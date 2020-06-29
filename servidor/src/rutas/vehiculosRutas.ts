import { Router } from 'express';

import { vehiculosControlador } from '../controladores/vehiculosControlador';

class VehiculosRutas {

	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/', vehiculosControlador.leerVehiculos);
		this.router.get('/last/:regInicial/:regFinal', vehiculosControlador.leerUltimosRegistros);
	}
}

const vehiculosRutas = new VehiculosRutas();
export default vehiculosRutas.router;