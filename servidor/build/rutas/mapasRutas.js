"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mapasControlador_1 = require("../controladores/mapasControlador");
class MapasRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    //dd
    config() {
        this.router.get('/:tipo', mapasControlador_1.mapasControlador.getIds);
        this.router.get('/:tipo/:id', mapasControlador_1.mapasControlador.getInfo);
    }
}
const mapasRutas = new MapasRutas();
exports.default = mapasRutas.router;
