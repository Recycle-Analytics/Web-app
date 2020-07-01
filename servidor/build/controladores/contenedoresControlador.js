"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ContenedoresControlador {
    leerContenedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT DISTINCT IdContenedor AS IdBasura, max(ID) ID FROM contenedores WHERE actualizacion IS NOT NULL GROUP BY IdContenedor ORDER BY IdContenedor asc;');
            var basurasJson = respuesta[0];
            var basuras = [];
            var ids = [];
            var idsContenedores = [];
            for (var i = 0; i < basurasJson.length; i++) {
                basuras[i] = {
                    IdContenedor: basurasJson[i].IdBasura,
                    Peso: "--",
                    Fecha: "--",
                    Direccion: "--",
                };
                ids[i] = basurasJson[i].ID;
                idsContenedores[i] = basurasJson[i].IdBasura;
            }
            //console.log(respuesta);
            ///console.log(basurasJson);
            console.log([basuras, ids, idsContenedores]);
            res.json([basuras, ids, idsContenedores]);
        });
    }
    leerUltimosRegistros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { regInicial, regFinal } = req.params;
            const respuesta = yield database_1.default.query('SELECT t.IdContenedor, t.Peso, t.Fecha, t.Direccion  FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID WHERE t.actualizacion IS NOT NULL AND t.IdContenedor>=? AND t.IdContenedor<=? ORDER BY t.IdContenedor;', [regInicial, regFinal]);
            console.log(respuesta);
            res.json(respuesta[0]);
        });
    }
}
const contenedoresControlador = new ContenedoresControlador();
exports.default = contenedoresControlador;
