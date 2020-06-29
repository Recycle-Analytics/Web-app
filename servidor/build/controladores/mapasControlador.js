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
exports.mapasControlador = void 0;
const database_1 = __importDefault(require("../database"));
class MapasControlador {
    getIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo } = req.params;
            var infoUtil;
            switch (tipo) {
                case "contenedores":
                    var respuesta = yield database_1.default.query('SELECT DISTINCT id_obj AS IdEntidad FROM test ORDER BY id_obj asc;');
                    infoUtil = respuesta[0];
                    break;
                case "vehiculos":
                    var respuesta = yield database_1.default.query('SELECT DISTINCT IdVehiculo AS IdEntidad FROM camiones ORDER BY IdVehiculo asc;');
                    infoUtil = respuesta[0];
                    break;
                case "rutas":
                    var respuesta = yield database_1.default.query('SELECT DISTINCT id_ruta AS IdEntidad FROM rutas ORDER BY id asc;');
                    infoUtil = respuesta[0];
                    break;
                default:
                    return 0;
                    break;
            }
            return res.json(infoUtil);
        });
    }
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, id } = req.params;
            var infoUtil;
            switch (tipo) {
                case "contenedores":
                    var respuesta = yield database_1.default.query('SELECT * FROM test WHERE id_obj=? ORDER BY IdContenedor desc LIMIT 1;', [Number(id)]);
                    infoUtil = respuesta[0];
                    break;
                case "vehiculos":
                    var respuesta = yield database_1.default.query('SELECT * FROM camiones WHERE IdVehiculo=? ORDER BY ID desc LIMIT 1;', [Number(id)]);
                    infoUtil = respuesta[0];
                    break;
                case "rutas":
                    var respuesta = yield database_1.default.query('SELECT * FROM rutas WHERE id_ruta=? ORDER BY id asc LIMIT 1;', [id]);
                    infoUtil = respuesta[0];
                    break;
                default:
                    return 0;
                    break;
            }
            var urlPrueba = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11248.02067074743!2d-74.08762002501061!3d4.6340364987642255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bd3925e7493%3A0x3fcd9f3ac53a3bff!2sCra.%2034%20%2330-65%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1593386314309!5m2!1ses!2sco";
            return res.json([urlPrueba, infoUtil]);
        });
    }
}
exports.mapasControlador = new MapasControlador();
