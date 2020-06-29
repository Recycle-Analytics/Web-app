"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculosControlador_1 = require("../controladores/vehiculosControlador");
class VehiculosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', vehiculosControlador_1.vehiculosControlador.leerVehiculos);
        this.router.get('/last/:regInicial/:regFinal', vehiculosControlador_1.vehiculosControlador.leerUltimosRegistros);
    }
}
const vehiculosRutas = new VehiculosRutas();
exports.default = vehiculosRutas.router;
