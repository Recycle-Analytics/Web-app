"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutasControlador_1 = require("../controladores/rutasControlador");
class RutasRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', rutasControlador_1.rutasControlador.getTotal);
        this.router.get('/:rutByScroll/:numScroll/:rutAdd/:rutSupr', rutasControlador_1.rutasControlador.getRutasConocidas);
        this.router.get('/repeat/:idR/:idV', rutasControlador_1.rutasControlador.validarRepetidos);
        this.router.post('/', rutasControlador_1.rutasControlador.createRuta);
        this.router.get('/progress/:rutasAct', rutasControlador_1.rutasControlador.getProgress);
        this.router.put('/:idRuta', rutasControlador_1.rutasControlador.updateRuta);
        this.router.delete('/:idRuta', rutasControlador_1.rutasControlador.destroyRuta);
    }
}
const rutasRutas = new RutasRutas();
exports.default = rutasRutas.router;
