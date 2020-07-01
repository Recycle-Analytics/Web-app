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
const listaDatosEstadisticos_1 = __importDefault(require("./listaDatosEstadisticos"));
class AnalisisDatos {
    constructor() {
        this.m2Ciudad = listaDatosEstadisticos_1.default.metrosCuadradosCiudad;
        this.capMaxCont = listaDatosEstadisticos_1.default.capacidadMaxContenedores;
        this.margFullCont = listaDatosEstadisticos_1.default.margenDeContenedoreLLeno;
        this.dTime = listaDatosEstadisticos_1.default.deltaTime;
        this.barrCub = listaDatosEstadisticos_1.default.barriosCubiertos;
        this.locCub = listaDatosEstadisticos_1.default.localidadesCubiertas;
    }
    actualizarEstadistica(stat) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Actualizacion de ' + stat);
            switch (stat) {
                //General
                case "Pc_T_Ocupado":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(t.Peso)*100/(COUNT(t.IdContenedor)*?) FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID),1) WHERE nombre=?;', [analisisDatos.capMaxCont, stat]);
                    break;
                case "Tn_T_Recogidas":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(Peso)/1000 FROM camiones WHERE descarga=1),1) WHERE nombre=?', [stat]);
                    break;
                case "Ts_N_Recoleccion": // OJO, Dependencia de la propia tabla de estadisticas
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((((SELECT SUM(t.Peso)/1000 FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID)-(SELECT dato FROM estadisticas WHERE nombre="Tn_T_Ocupadas"))/?),1) WHERE nombre=?', [analisisDatos.dTime, stat]);
                    break;
                case "Tn_T_Moviendose":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(t.Peso)/1000  FROM (SELECT IdVehiculo, MAX(id) as ID FROM camiones GROUP BY IdVehiculo) r INNER JOIN camiones t ON t.IdVehiculo = r.IdVehiculo AND t.id = r.ID WHERE t.Encendido=1),1) WHERE nombre=?', [stat]);
                    break;
                case "Ds_Contenedores":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND(((SELECT COUNT(DISTINCT(IdContenedor)) FROM contenedores)/?),1) WHERE nombre=?', [analisisDatos.m2Ciudad, stat]);
                    break;
                case "Tn_T_Ocupadas":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(t.Peso)/1000 FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID),1) WHERE nombre=?', [stat]);
                    break;
                //Contenedores
                case "Cnt_T_Funcionando":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((SELECT COUNT(DISTINCT(IdContenedor)) FROM contenedores),1) WHERE nombre=?', [stat]);
                    break;
                case "Pc_Cnt_Llenos":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND(((SELECT COUNT(t.IdContenedor) FROM (SELECT IdContenedor, MAX(id) as ID FROM contenedores GROUP BY IdContenedor) r INNER JOIN contenedores t ON t.IdContenedor = r.IdContenedor AND t.id = r.ID WHERE t.Peso>?)*100/(SELECT COUNT(DISTINCT(IdContenedor)) FROM contenedores)),1) WHERE nombre=?', [analisisDatos.margFullCont, stat]);
                    break;
                //Vehiculos
                case "Vh_T_Disponibles":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((SELECT COUNT(DISTINCT(IdVehiculo)) FROM camiones),1) WHERE nombre=?', [stat]);
                    break;
                case "Vh_T_Operando":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((SELECT SUM(t.Peso)/1000  FROM (SELECT IdVehiculo, MAX(id) as ID FROM camiones GROUP BY IdVehiculo) r INNER JOIN camiones t ON t.IdVehiculo = r.IdVehiculo AND t.id = r.ID WHERE t.Encendido=1),1) WHERE nombre=?', [stat]);
                    break;
                //Rutas
                case "Rt_T_Establecidas":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((SELECT COUNT(DISTINCT(id_ruta)) FROM rutas),1) WHERE nombre=?', [stat]);
                    break;
                case "Pm_Cnt_Ruta":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND(((SELECT SUM(LENGTH(REPLACE(contenedores, ",", "")))/3 FROM rutas)/(SELECT COUNT(DISTINCT(id_ruta)) FROM rutas)),1) WHERE nombre=?', [stat]);
                    break;
                //Zonas
                case "Br_T_Cubiertos":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((?),1) WHERE nombre=?', [analisisDatos.barrCub, stat]);
                    break;
                case "Lc_T_Cubiertas":
                    yield database_1.default.query('UPDATE estadisticas SET dato=ROUND((?),1) WHERE nombre=?', [analisisDatos.locCub, stat]);
                    break;
            }
            //const respuesta = await pool.query('SELECT Peso FROM contenedores');
            //console.log(respuesta);
            //return respuesta;
        });
    }
}
const analisisDatos = new AnalisisDatos();
exports.default = analisisDatos;
