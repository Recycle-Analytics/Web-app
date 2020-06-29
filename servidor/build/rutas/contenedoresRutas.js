"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contenedoresControlador_1 = __importDefault(require("../controladores/contenedoresControlador"));
class ContenedoresRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', contenedoresControlador_1.default.leerContenedores);
        this.router.get('/last/:regInicial/:regFinal', contenedoresControlador_1.default.leerUltimosRegistros);
    }
}
const contenedoresRutas = new ContenedoresRutas();
exports.default = contenedoresRutas.router;
