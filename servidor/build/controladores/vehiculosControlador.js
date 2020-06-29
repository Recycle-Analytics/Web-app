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
exports.vehiculosControlador = void 0;
const database_1 = __importDefault(require("../database"));
class VehiculosControlador {
    leerVehiculos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('SELECT DISTINCT IdVehiculo AS IdCamion, max(ID) ID FROM camiones WHERE actualizacion IS NOT NULL GROUP BY IdVehiculo ORDER BY IdVehiculo asc;');
                var camionesJson = respuesta[0];
                var camiones = [];
                var ids = [];
                var idsVehiculos = [];
                for (var i = 0; i < camionesJson.length; i++) {
                    camiones[i] = {
                        IdVehiculo: camionesJson[i].IdCamion,
                        Fecha: "--",
                        Hora: "--",
                        Peso: "--",
                        Humedad: "--",
                        Temperatura: "--",
                        Gas: "--",
                        Fuego: "--"
                    };
                    ids[i] = camionesJson[i].ID;
                    idsVehiculos[i] = camionesJson[i].IdCamion;
                }
                //console.log(respuesta);
                ///console.log(camionesJson);
                console.log([camiones, ids, idsVehiculos]);
                res.json([camiones, ids, idsVehiculos]);
            }
            catch (err) {
                console.log("WTF");
            }
        });
    }
    leerUltimosRegistros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { regInicial, regFinal } = req.params;
            const respuesta = yield database_1.default.query('SELECT t.IdVehiculo, t.Fecha, t.Hora, t.Peso, t.Humedad, t.Temperatura, t.Gas, t.Fuego  FROM (SELECT IdVehiculo, MAX(id) as ID FROM camiones GROUP BY IdVehiculo) r INNER JOIN camiones t ON t.IdVehiculo = r.IdVehiculo AND t.id = r.ID WHERE t.actualizacion IS NOT NULL AND t.IdVehiculo>=? AND t.IdVehiculo<=? ORDER BY IdVehiculo;', [regInicial, regFinal]);
            console.log(respuesta);
            res.json(respuesta[0]);
        });
    }
}
exports.vehiculosControlador = new VehiculosControlador();
