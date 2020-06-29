"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadisticasControlador_1 = require("../controladores/estadisticasControlador");
class EstadisticasRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:category/:id', estadisticasControlador_1.estadisticasControlador.getEstadisticas);
        //this.router.get('//:ids', estadisticasControlador.getByCategorias);
    }
}
const estadisticasRutas = new EstadisticasRutas();
exports.default = estadisticasRutas.router;
