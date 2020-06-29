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
exports.indexControlador = void 0;
const database_1 = __importDefault(require("../database"));
class IndexControlador {
    /*public async leer ( req: Request, res: Response): Promise<void>{
        const basuras = await pool.query('SELECT ID , IdVehiculo , Fecha , Hora , Peso , Humedad, Temperatura, Gas, Fuego, actualizacion FROM camiones ORDER BY ID desc;');
        res.json(basuras[0]);
    }*/
    leerConocidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actByScroll, numScroll, actRequested } = req.params;
            var respuesta = [];
            var oldRecolectores = [];
            var tipos = [];
            for (var i = 0; i < parseInt(actByScroll); i++) {
                var oldRecolectorVehiculo = yield database_1.default.query('SELECT * FROM camiones WHERE actualizacion=(GREATEST(IF((SELECT max(actualizacion) FROM test) IS NULL,0,(SELECT max(actualizacion) FROM test)),IF((SELECT max(actualizacion) FROM camiones) IS NULL,0,(SELECT max(actualizacion) FROM camiones)))-?-?*(?-1)-?) ORDER BY ID desc;', [i, actByScroll, numScroll, actRequested]);
                var oldRecolectorContenedor = yield database_1.default.query('SELECT * FROM test WHERE actualizacion=(GREATEST(IF((SELECT max(actualizacion) FROM test) IS NULL,0,(SELECT max(actualizacion) FROM test)),IF((SELECT max(actualizacion) FROM camiones) IS NULL,0,(SELECT max(actualizacion) FROM camiones)))-?-?*(?-1)-?) ORDER BY ID desc;', [i, actByScroll, numScroll, actRequested]);
                oldRecolectores = oldRecolectores.concat(oldRecolectorVehiculo[0], oldRecolectorContenedor[0]);
                if ((oldRecolectorVehiculo[0].length > 0) && (oldRecolectorContenedor[0].length == 0)) {
                    tipos.push('Vehiculos');
                }
                else if ((oldRecolectorContenedor[0].length > 0) && (oldRecolectorVehiculo[0].length == 0)) {
                    tipos.push('Contenedores');
                }
                else {
                    console.log('algo anda mal con la peticion o no hay mas actualizaciones disponibles');
                }
            }
            console.log(oldRecolectorVehiculo[0].length);
            console.log(oldRecolectorContenedor[0].length);
            respuesta[0] = oldRecolectores;
            respuesta[1] = tipos;
            console.log(respuesta);
            return res.json(respuesta);
        });
    }
    takeAct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //optimizar codigo cuando exista la tabla basuras
            const { type } = req.params;
            if (type == "Contenedores") {
                const newRecolectorContenedor = yield database_1.default.query('SELECT * FROM test WHERE actualizacion=(SELECT max(actualizacion) FROM test) ORDER BY create_at desc;');
                return res.json(newRecolectorContenedor[0]);
            }
            else if (type == "Vehiculos") {
                const newRecolectorVehiculo = yield database_1.default.query('SELECT * FROM camiones WHERE actualizacion=(SELECT max(actualizacion) FROM camiones) ORDER BY ID desc;'); //
                return res.json(newRecolectorVehiculo[0]);
            }
            else {
                console.log("No se reconoce el tipo de objeto");
                return res.json({ message: "No se reconoce el tipo de objeto" });
            }
        });
    }
    giveAct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entra a give_Act");
            //optimizar codigo cuando exista la tabla basuras-
            const { type } = req.params;
            if (type == "Contenedores") {
                yield database_1.default.query('UPDATE test set actualizacion=(IF((SELECT actualizacion from camiones where id=(SELECT min(id) FROM camiones)) IS NULL AND (SELECT actualizacion from test where id=(SELECT min(id) FROM test)) IS NULL,1,IF((SELECT actualizacion from test where id=(SELECT min(id) FROM test)) IS NULL,((SELECT max(actualizacion) from camiones)+1),IF((SELECT actualizacion from camiones where id=(SELECT min(id) FROM camiones)) IS NULL,((SELECT max(actualizacion) from test)+1),(GREATEST((SELECT max(actualizacion) from test),(SELECT max(actualizacion) from camiones))+1))))) WHERE actualizacion IS NULL');
                res.json({ message: "Registro Actualizado" });
            }
            else if (type == "Vehiculos") {
                yield database_1.default.query('UPDATE camiones set actualizacion=(IF((SELECT actualizacion from camiones where id=(SELECT min(id) FROM camiones)) IS NULL AND (SELECT actualizacion from test where id=(SELECT min(id) FROM test)) IS NULL,1,IF((SELECT actualizacion from test where id=(SELECT min(id) FROM test)) IS NULL,((SELECT max(actualizacion) from camiones)+1),IF((SELECT actualizacion from camiones where id=(SELECT min(id) FROM camiones)) IS NULL,((SELECT max(actualizacion) from test)+1),(GREATEST((SELECT max(actualizacion) from test),(SELECT max(actualizacion) from camiones))+1))))) WHERE actualizacion IS NULL');
                res.json({ message: "Registro Actualizado" });
            }
            else {
                console.log("No se reconoce el tipo de objeto");
                res.json({ message: "No se reconoce el tipo de objeto" });
            }
        });
    }
}
exports.indexControlador = new IndexControlador();
