"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRutas_1 = __importDefault(require("./rutas/indexRutas"));
const contenedoresRutas_1 = __importDefault(require("./rutas/contenedoresRutas"));
const vehiculosRutas_1 = __importDefault(require("./rutas/vehiculosRutas"));
const rutasRutas_1 = __importDefault(require("./rutas/rutasRutas"));
const estadisticasRutas_1 = __importDefault(require("./rutas/estadisticasRutas"));
const mapasRutas_1 = __importDefault(require("./rutas/mapasRutas"));
const listaDatosEstadisticos_1 = __importDefault(require("./analisis/listaDatosEstadisticos"));
const analisis_datos_1 = __importDefault(require("./analisis/analisis_datos"));
class Servidor {
    constructor() {
        this.aplicacion = express_1.default();
        this.config();
        this.routes();
        this.setAnalisis();
    }
    config() {
        this.aplicacion.set('port', process.env.PORT || 3000);
        this.aplicacion.use(morgan_1.default('dev'));
        this.aplicacion.use(cors_1.default());
        this.aplicacion.use(express_1.default.json());
        this.aplicacion.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.aplicacion.use('/api/Recyclable_Analytics/last', indexRutas_1.default);
        this.aplicacion.use('/api/Recyclable_Analytics/contenedores', contenedoresRutas_1.default);
        this.aplicacion.use('/api/Recyclable_Analytics/vehiculos', vehiculosRutas_1.default);
        this.aplicacion.use('/api/Recyclable_Analytics/rutas', rutasRutas_1.default);
        this.aplicacion.use('/api/Recyclable_Analytics/estadisticas', estadisticasRutas_1.default);
        this.aplicacion.use('/api/Recyclable_Analytics/mapas', mapasRutas_1.default);
    }
    start() {
        this.aplicacion.listen(this.aplicacion.get('port'), () => {
            console.log('Servidor en puerto', this.aplicacion.get('port'));
        });
    }
    setAnalisis() {
        listaDatosEstadisticos_1.default.crearTablaEstadistica(listaDatosEstadisticos_1.default.lista).then(result => { console.log("acabo"); });
        setInterval(() => { analisis_datos_1.default.actualizarEstadistica("Pc_T_Ocupado"); }, 2000);
        setInterval(() => { analisis_datos_1.default.actualizarEstadistica("Tn_T_Recogidas"); }, 20000);
        setInterval(() => {
            analisis_datos_1.default.actualizarEstadistica("Ts_N_Recoleccion");
            analisis_datos_1.default.actualizarEstadistica("Tn_T_Ocupadas");
        }, 2000);
        setInterval(() => { analisis_datos_1.default.actualizarEstadistica("Tn_T_Moviendose"); }, 2000);
        setInterval(() => { analisis_datos_1.default.actualizarEstadistica("Ds_Contenedores"); }, 10000); //1000000
        setInterval(() => { analisis_datos_1.default.actualizarEstadistica("Cnt_T_Funcionando"); }, 10000); //1000000
        setInterval(() => { analisis_datos_1.default.actualizarEstadistica("Pc_Cnt_Llenos"); }, 2000);
        setInterval(() => { analisis_datos_1.default.actualizarEstadistica("Vh_T_Disponibles"); }, 10000); //1000000
        setInterval(() => { analisis_datos_1.default.actualizarEstadistica("Vh_T_Operando"); }, 2000);
        analisis_datos_1.default.actualizarEstadistica("Rt_T_Establecidas"); //"Rt_T_Establecidas" se actualiza con los Controladores de rutas
        analisis_datos_1.default.actualizarEstadistica("Pm_Cnt_Ruta"); //"Pm_Cnt_Ruta" se actualiza con los Controladores de rutas
        analisis_datos_1.default.actualizarEstadistica("Br_T_Cubiertos"); //"Br_T_Cubiertos" Se actualiza con los Controladores de estadisticas
        analisis_datos_1.default.actualizarEstadistica("Lc_T_Cubiertas"); //"Lc_T_Cubiertas" Se actualiza con los Controladores de estadisticas
    }
}
const servidor = new Servidor();
servidor.start();
