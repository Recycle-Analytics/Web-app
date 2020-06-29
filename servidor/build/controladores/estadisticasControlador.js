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
exports.estadisticasControlador = void 0;
const listaDatosEstadisticos_1 = __importDefault(require("../analisis/listaDatosEstadisticos"));
const database_1 = __importDefault(require("../database"));
class EstadisticasControlador {
    getEstadisticas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category, id } = req.params;
            // Segun los casos de cada categoria (ver Tabla)---------
            const datosPorCategoria = listaDatosEstadisticos_1.default.countDatosCategorias();
            const categorias = ["general", "contenedores", "vehiculos", "rutas", "zonas"];
            //-------------------------------------------------------
            //---Formacion de Script SQL para condicionar la peticion-----------
            var datosEstadisticos = [];
            var mascara = [4, 2, 2, 2, 2];
            var indexCategoria = categorias.indexOf(category);
            if (Number(id) != 0) {
                var nombre = exports.estadisticasControlador.getNombreInfo(category, ((Number(id) - 1) % datosPorCategoria[indexCategoria] + 1));
                var respuesta = yield database_1.default.query('SELECT nombre, titulo, dato, unidad, label, create_at FROM estadisticas WHERE nombre=? ORDER BY orden;', [nombre]);
                var datos = respuesta[0];
                datosEstadisticos = datosEstadisticos.concat(datos[0]);
            }
            else {
                for (var j = 1; j <= datosPorCategoria[indexCategoria]; j++) {
                    var nombre = exports.estadisticasControlador.getNombreInfo(category, j);
                    var respuesta = yield database_1.default.query('SELECT * FROM estadisticas WHERE nombre=? ORDER BY orden;', [nombre]);
                    var datos = respuesta[0];
                    datosEstadisticos = datosEstadisticos.concat(datos[0]);
                }
            }
            //-------------------------------------------------------------------------
            //console.log(datosEstadisticos);
            return res.json([indexCategoria, datosEstadisticos]);
        });
    }
    //--------------Tabla para hallar Datos Estadisticos--------------------------
    getNombreInfo(categoria, id_cat) {
        switch (categoria) {
            case "general":
                switch (id_cat) {
                    case 1:
                        return "Pc_T_Ocupado";
                        break;
                    case 2:
                        return "Tn_T_Recogidas";
                        break;
                    case 3:
                        return "Ts_N_Recoleccion";
                        break;
                    case 4:
                        return "Tn_T_Moviendose";
                        break;
                    case 5:
                        return "Ds_Contenedores";
                        break;
                    case 6:
                        return "Tn_T_Ocupadas";
                        break;
                }
                break;
            case "contenedores":
                switch (id_cat) {
                    case 1:
                        return "Cnt_T_Funcionando";
                        break;
                    case 2:
                        return "Pc_Cnt_Llenos";
                        break;
                }
                break;
            case "vehiculos":
                switch (id_cat) {
                    case 1:
                        return "Vh_T_Disponibles";
                        break;
                    case 2:
                        return "Vh_T_Operando";
                        break;
                }
                break;
            case "rutas":
                switch (id_cat) {
                    case 1:
                        return "Rt_T_Establecidas";
                        break;
                    case 2:
                        return "Pm_Cnt_Ruta";
                        break;
                }
                break;
            case "zonas":
                switch (id_cat) {
                    case 1:
                        return "Br_T_Cubiertos";
                        break;
                    case 2:
                        return "Lc_T_Cubiertas";
                        break;
                }
                break;
            default:
                return "Cat_No_Encontrada";
                break;
        }
    }
}
exports.estadisticasControlador = new EstadisticasControlador();
