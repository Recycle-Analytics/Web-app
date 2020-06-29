"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControlador_1 = require("../controladores/indexControlador");
class IndexRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.get('/', indexControlador.leer);
        this.router.get('/:actByScroll/:numScroll/:actRequested', indexControlador_1.indexControlador.leerConocidos);
        this.router.get('/:type', indexControlador_1.indexControlador.takeAct);
        this.router.put('/:type', indexControlador_1.indexControlador.giveAct);
    }
}
const indexRutas = new IndexRutas();
exports.default = indexRutas.router;
