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
            const respuesta = yield database_1.default.query('SELECT DISTINCT id_obj AS IdBasura, max(ID) ID FROM test WHERE actualizacion IS NOT NULL GROUP BY id_obj ORDER BY id_obj asc;');
            var basurasJson = respuesta[0];
            var basuras = [];
            var ids = [];
            var idsContenedores = [];
            for (var i = 0; i < basurasJson.length; i++) {
                basuras[i] = {
                    id_obj: basurasJson[i].IdBasura,
                    PESO: "--",
                    create_at: "--",
                    ubicacion: "--",
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
            const respuesta = yield database_1.default.query('SELECT t.id_obj, t.PESO, t.create_at, t.ubicacion  FROM (SELECT id_obj, MAX(id) as ID FROM test GROUP BY id_obj) r INNER JOIN test t ON t.id_obj = r.id_obj AND t.id = r.ID WHERE t.actualizacion IS NOT NULL AND t.id_obj>=? AND t.id_obj<=? ORDER BY t.id_obj;', [regInicial, regFinal]);
            console.log(respuesta);
            res.json(respuesta[0]);
        });
    }
}
const contenedoresControlador = new ContenedoresControlador();
exports.default = contenedoresControlador;
