import pool from '../database';


class ListaDatosEstadisticos{

	constructor(){}

	public async askExistentes(reg: any): Promise<any>{
		const resultado = await pool.query('SELECT nombre FROM estadisticas WHERE nombre=?;',[reg.nombre]);
		const existentes: any = resultado[0].length;
		return [existentes,reg];			
	}

	public async setRegistro(register: any): Promise<void>{
			console.log(register);
			await pool.query('INSERT INTO estadisticas SET ?;', [register]);		
	}

	public async crearTablaEstadistica(list: any): Promise<void> {
		for(var i=0; i<list.length; i++){
			listaDatosEstadisticos.askExistentes(list[i]).then(result =>{
				if(result[0]==0){
					console.log('creo un nuevo registro' );
					listaDatosEstadisticos.setRegistro(result[1]);
				}
			});
		}
	}

	public lista: Array<any> = [{
		//General
			nombre: "Pc_T_Ocupado",
			titulo: "Espacio Disponible en Contenedores",
			dato: 0,
			unidad: "%",
			label: "Porciento de espacio total libre en contenedores del sistema",
			orden: 1
		},
		{
			nombre: "Tn_T_Recogidas",
			titulo: "Total Residuos Recogidos",
			dato: 0,
			unidad: "Tons",
			label: "Toneladas de desechos recogidos por el sistema",
			orden: 2
		},
		{
			nombre: "Ts_N_Recoleccion",
			titulo: "Tasa Neta de Recoleccion",
			dato: 0,
			unidad: "Tons/min",
			label: "Toneladas por minuto de desechos fluyen en el sistema",
			orden: 3
		},
		{
			nombre: "Tn_T_Moviendose",
			titulo: "Total Desechos Transportandose",
			dato: 0,
			unidad: "Tons",
			label: "Toneladas de Desechos siendo transportados",
			orden: 4
		},
		{
			nombre: "Ds_Contenedores",
			titulo: "Densidad de Contenedores",
			dato: 0,
			unidad: "Cont/km2",
			label: "Contenedores por kilometro cuadrado en la Ciudad",
			orden: 5
		},
		{
			nombre: "Tn_T_Ocupadas",
			titulo: "Total de Desechos en Contenedores",
			dato: 0,
			unidad: "Tons",
			label: "Toneladas de desechos presentes en Contenedores",
			orden: 6
		},
		//Contenedores
		{
			nombre: "Cnt_T_Funcionando",
			titulo: "Total de Contenedores",
			dato: 0,
			unidad: "Cont.",
			label: "Contenedores implementados en el sistema",
			orden: 100
		},
		{
			nombre: "Pc_Cnt_Llenos",
			titulo: "Contenedores Llenos",
			dato: 0,
			unidad: "%",
			label: "Porciento de contendores llenos en el sistema",
			orden: 101
		},
		//Vehiculos
		{
			nombre: "Vh_T_Disponibles",
			titulo: "Vehiculos Disponibles",
			dato: 0,
			unidad: "Veh.",
			label: "Vehiculos disponibles en el sistema",
			orden: 200
		},
		{
			nombre: "Vh_T_Operando",
			titulo: "Vehiculos Operando",
			dato: 0,
			unidad: "Veh",
			label: "Vehiculos encendidos y funcionando actualmente",
			orden: 201
		},
		//Rutas
		{
			nombre: "Rt_T_Establecidas",
			titulo: "Rutas Establecidas",
			dato: 0,
			unidad: "Rutas",
			label: "Rutas ingresadas al sistema de recoleccion",
			orden: 300
		},
		{
			nombre: "Pm_Cnt_Ruta",
			titulo: "Promedio de Contenedores por Ruta",
			dato: 0,
			unidad: "Cont/Ruta",
			label: "Contendores promedio por cada Ruta del sistema",
			orden: 301
		},
		//Zonas
		{
			nombre: "Br_T_Cubiertos",
			titulo: "Barrios Cubiertos",
			dato: 0,
			unidad: "B.",
			label: "Barrios cubiertos por el sistema de recoleccion",
			orden: 400
		},
		{
			nombre: "Lc_T_Cubiertas",
			titulo: "Localidades Cubiertas",
			dato: 0,
			unidad: "L.",
			label: "Localidades cubiertas por el sistema de recoleccion",
			orden: 401
		}
	];

	metrosCuadradosCiudad: number = 1775;
	capacidadMaxContenedores: number = 192;
	margenDeContenedoreLLeno: number = 172;
	deltaTime: number = 2/60;
	barriosCubiertos: number = 10;
	localidadesCubiertas: number = 2;

	public countDatosCategorias(): Array<number>{
		var infoPorCategoria: Array<number> = [0, 0, 0, 0, 0];
		for(let reg of listaDatosEstadisticos.lista){
			if(reg.orden<100){
				infoPorCategoria[0]++;
			}else if(reg.orden>=100 && reg.orden<200){
				infoPorCategoria[1]++;
			}else if(reg.orden>=200 && reg.orden<300){
				infoPorCategoria[2]++;
			}else if(reg.orden>=300 && reg.orden<400){
				infoPorCategoria[3]++;
			}else if(reg.orden>=400 && reg.orden<500){
				infoPorCategoria[4]++;
			}
		}
		//console.log(infoPorCategoria);
		return infoPorCategoria;
	}
}

const listaDatosEstadisticos = new ListaDatosEstadisticos();

export default listaDatosEstadisticos;