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
exports.rutasControlador = void 0;
const database_1 = __importDefault(require("../database"));
class RutasControlador {
    getTotal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalRutas = yield database_1.default.query('SELECT id_ruta FROM rutas;');
            console.log(totalRutas[0].length);
            return res.json([totalRutas[0].length]);
        });
    }
    getRutasConocidas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rutByScroll, numScroll, rutAdd, rutSupr } = req.params;
            var rutasByScroll = Number(rutByScroll);
            var numeroScroll = Number(numScroll);
            var rutasAdd = Number(rutAdd);
            var rutasSupr = Number(rutSupr);
            var inicio = rutasByScroll * (numeroScroll - 1) + rutasAdd - rutasSupr;
            var final = rutasByScroll * numeroScroll + rutasAdd - rutasSupr;
            const rutasConocidas = yield database_1.default.query('SELECT * FROM rutas ORDER BY id desc;');
            const rutasDeRespuesta = rutasConocidas[0].slice(inicio, final);
            return res.json(rutasDeRespuesta);
        });
    }
    validarRepetidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idR, idV } = req.params;
            console.log(idR);
            console.log(Number(idV));
            var repetidos = yield database_1.default.query('SELECT * FROM rutas WHERE id_ruta="?" OR IdVehiculo=?;', [idR, idV]);
            console.log(repetidos[0]);
            if (repetidos[0].length > 0) {
                res.json({ valid: false });
            }
            else {
                res.json({ valid: true });
            }
        });
    }
    createRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO rutas SET ?;', [req.body]);
            res.json({ message: "Ruta Creada" });
        });
    }
    getProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { rutasAct } = req.params;
            var progresos = yield database_1.default.query('SELECT progreso FROM rutas ORDER BY id desc LIMIT ?;', [rutasAct]);
            var rutasDeRespuesta = progresos[0];
            return res.json(rutasDeRespuesta);
        });
    }
    updateRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idRuta } = req.params;
            yield database_1.default.query('UPDATE rutas SET ? WHERE id_ruta=?;', [req.body, idRuta]);
            res.json({ message: "Ruta Modificada" });
        });
    }
    destroyRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idRuta } = req.params;
            yield database_1.default.query('DELETE FROM rutas WHERE id_ruta=?;', [idRuta]);
            res.json({ message: "Ruta Eliminada" });
        });
    }
}
exports.rutasControlador = new RutasControlador();
