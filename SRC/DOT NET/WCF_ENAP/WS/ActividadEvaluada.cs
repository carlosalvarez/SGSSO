/**
*Imports.
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using WCF_ENAP.WS;
using System.Web;

/**
  *NameSpace.
  */
namespace WCF_ENAP
{
    public class ActividadJSON
    {
        public int ID_ACTIVIDAD_ESPECIFICA;
        public string NOM_ACTIVIDAD_ESPECIFICA;
        public bool ESTADO;
    }
    public class ActividadJSONPOST
    {   
        public int ID_ACTIVIDAD_EVALUADA;
        public int ID_ACTIVIDAD_GENERAL;
        public int ID_ACTIVIDAD_ESPECIFICA;
        public int ID_CARGO;
        public int ID_DEPARTAMENTO_ORGANIZACION;
        public int ID_PELIGRO;
        public int ID_AREA;
        public int ID_DIVISION;
        public int[] MEDIDAS;
        public int VALORACION_CONSECUENCIA;
        public int VALORACION_PROBABILIDAD;
        public int MEDIDA_VALORACION_CONSECUENCIA;
        public int MEDIDA_VALORACION_PROBABILIDAD;
        public int CONDICION;
        public DateTime FECHA_CREACION;
        public bool ESTADO;
    }
    public class ActividadJSONGETGROUP
    {
        public int ID_MATRIZ_RIESGO;
        public int ID_ACTIVIDAD_ESPECIFICA;
        public string NOM_ACTIVIDAD_ESPECIFICA;
        public int ID_PELIGRO;
        public string NOM_PELIGRO;
        public int ID_MEDIDAS_DE_CONTROL;
        public int VALORACION_CONSECUENCIA;
        public int VALORACION_PROBABILIDAD;
        public int MEDIDA_VALORACION_CONSECUENCIA;
        public int MEDIDA_VALORACION_PROBABILIDAD;
        public bool ESTADO;
    }
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
	public class ActividadEvaluada
	{
		private DataClassesEnapDataContext bd;

		public ActividadEvaluada()
		{
			bd = new DataClassesEnapDataContext();
		}
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_ORGANIZACION={_ID_ORGANIZACION}&ID_DEPARTAMENTO_ORGANIZACION={_ID_DEPARTAMENTO_ORGANIZACION}&ID_DIVISION={_ID_DIVISION}&ID_AREA={_ID_AREA}&ID_ACTIVIDAD_GENERAL={_ID_ACTIVIDAD_GENERAL}&NOM_ACTIVIDAD_ESPECIFICA={_NOM_ACTIVIDAD_ESPECIFICA}&ID_CARGO={_ID_CARGO}&CONDICION={_CONDICION}")]
        public JSONCollection<List<TBL_ACTIVIDAD_EVALUADA>> GetCollection(int _page, 
                                                                            int _start, 
                                                                            int _limit, 
                                                                            string _sort, 
                                                                            string _dir, 
                                                                            int _ID_ORGANIZACION, 
                                                                            int _ID_DEPARTAMENTO_ORGANIZACION, 
                                                                            int _ID_DIVISION,
                                                                            int _ID_AREA, 
                                                                            int _ID_ACTIVIDAD_GENERAL,
                                                                            string _NOM_ACTIVIDAD_ESPECIFICA, 
                                                                            int _ID_CARGO,
                                                                            int _CONDICION)
        {
            JSONCollection<List<TBL_ACTIVIDAD_EVALUADA>> objJSON = new JSONCollection<List<TBL_ACTIVIDAD_EVALUADA>>();
            try
            {
                if (_dir == null)
                {
                    _dir = "DESC";
                }
                if (_page == 0)
                {
                    _page = 1;
                }
                if (_limit == 0)
                {
                    _limit = 10;
                }
                _start = (_page * _limit) - _limit;
                if (_ID_ORGANIZACION != 0 || _ID_DEPARTAMENTO_ORGANIZACION != 0 || _ID_DIVISION != 0 || _ID_AREA != 0 || _ID_ACTIVIDAD_GENERAL != 0 || _NOM_ACTIVIDAD_ESPECIFICA != null || _ID_CARGO != 0 || _CONDICION != 0)
                {
                    var query = bd.sp_search_actividad_evaluada(_ID_ORGANIZACION,
                        _ID_DEPARTAMENTO_ORGANIZACION,
                        _ID_DIVISION,
                        _ID_AREA,
                        _ID_ACTIVIDAD_GENERAL,
                        _NOM_ACTIVIDAD_ESPECIFICA,
                        _ID_CARGO,
                        _CONDICION,
                        null,
                        null
                        ).Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                    List<TBL_ACTIVIDAD_EVALUADA> results = query.ToList();

                    objJSON.items = results;
                    objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count<TBL_ACTIVIDAD_EVALUADA>();
                    objJSON.success = true;
                }
                else
                {

                    var query = bd.TBL_ACTIVIDAD_EVALUADA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                    List<TBL_ACTIVIDAD_EVALUADA> results = query.ToList();

                    objJSON.items = results;
                    objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count<TBL_ACTIVIDAD_EVALUADA>();
                    objJSON.success = true;
                }
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<ActividadJSONPOST> Create(int ID_ACTIVIDAD_GENERAL, int ID_CARGO, int ID_DIVISION, int ID_ACTIVIDAD_ESPECIFICA, int ID_DEPARTAMENTO_ORGANIZACION, int ID_PELIGRO, int ID_AREA,  int VALORACION_CONSECUENCIA, int VALORACION_PROBABILIDAD, int MEDIDA_VALORACION_CONSECUENCIA, int MEDIDA_VALORACION_PROBABILIDAD, int CONDICION, int[] MEDIDAS)
        {
            JSONCollection<ActividadJSONPOST> objJSON = new JSONCollection<ActividadJSONPOST>();
            List<ActividadJSONPOST> list = (List<ActividadJSONPOST>)HttpContext.Current.Session["TempActividadEvaluada"];
            if (list == null)
            {
                throw new Exception("No hay datos en la lista");
            }
            TBL_MATRIZ nueva_matriz = new TBL_MATRIZ()
            {
                FECHA_CREACION = DateTime.Now,
                ESTADO = true
            };
            bd.TBL_MATRIZ.InsertOnSubmit(nueva_matriz);
            bd.SubmitChanges();
            foreach (ActividadJSONPOST nueva_actividad in list)
            {
                
                TBL_ACTIVIDAD_EVALUADA nuevo = new TBL_ACTIVIDAD_EVALUADA()
                {
                    ID_ACTIVIDAD_GENERAL = nueva_actividad.ID_ACTIVIDAD_GENERAL,
                    ID_CARGO = nueva_actividad.ID_CARGO,
                    ID_ACTIVIDAD_ESPECIFICA = nueva_actividad.ID_ACTIVIDAD_ESPECIFICA,
                    ID_DEPARTAMENTO_ORGANIZACION = nueva_actividad.ID_DEPARTAMENTO_ORGANIZACION,
                    ID_PELIGRO = nueva_actividad.ID_PELIGRO,
                    VALORACION_CONSECUENCIA = nueva_actividad.VALORACION_CONSECUENCIA,
                    VALORACION_PROBABILIDAD = nueva_actividad.VALORACION_PROBABILIDAD,
                    MEDIDA_VALORACION_CONSECUENCIA = nueva_actividad.MEDIDA_VALORACION_CONSECUENCIA,
                    MEDIDA_VALORACION_PROBABILIDAD = nueva_actividad.MEDIDA_VALORACION_PROBABILIDAD,
                    CONDICION = nueva_actividad.CONDICION,
                    FECHA_CREACION = DateTime.Now
                };
                if (nueva_actividad.ID_DIVISION != 0)
                {
                    nuevo.ID_DIVISION = nueva_actividad.ID_DIVISION;
                }
                if (nueva_actividad.ID_AREA != 0)
                {
                    nuevo.ID_AREA = nueva_actividad.ID_AREA;
                }

                bd.TBL_ACTIVIDAD_EVALUADA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
                for (int i = 0; i < nueva_actividad.MEDIDAS.Length; i++)
                {
                    TBL_PELIGRO_MEDIDA nuevo_peligro_medida = new TBL_PELIGRO_MEDIDA()
                    {
                        ID_ACTIVIDAD_EVALUADA = nuevo.ID_ACTIVIDAD_EVALUADA,
                        ID_MEDIDAS_DE_CONTROL = nueva_actividad.MEDIDAS[i],
                        FECHA_CREACION = DateTime.Now

                    };
                    bd.TBL_PELIGRO_MEDIDA.InsertOnSubmit(nuevo_peligro_medida);
                    bd.SubmitChanges();
                }
                TBL_MATRIZ_ACTIVIDAD matriz_actividad = new TBL_MATRIZ_ACTIVIDAD()
                {
                    FECHA_CREACION=DateTime.Now,
                    ID_ACTIVIDAD_EVALUADA = nuevo.ID_ACTIVIDAD_EVALUADA,
                    ID_MATRIZ = nueva_matriz.ID_MATRIZ
                };
                bd.TBL_MATRIZ_ACTIVIDAD.InsertOnSubmit(matriz_actividad);
                bd.SubmitChanges();
            }



            /*
            JSONCollection<ActividadJSONPOST> objJSON = new JSONCollection<ActividadJSONPOST>();
            TBL_ACTIVIDAD_EVALUADA nuevo = new TBL_ACTIVIDAD_EVALUADA()
            {
                ID_ACTIVIDAD_GENERAL = ID_ACTIVIDAD_GENERAL,
                ID_CARGO = ID_CARGO,
                ID_ACTIVIDAD_ESPECIFICA = ID_ACTIVIDAD_ESPECIFICA,
                ID_DEPARTAMENTO_ORGANIZACION = ID_DEPARTAMENTO_ORGANIZACION,
                ID_PELIGRO = ID_PELIGRO,
                VALORACION_CONSECUENCIA = VALORACION_CONSECUENCIA,
                VALORACION_PROBABILIDAD = VALORACION_PROBABILIDAD,
                MEDIDA_VALORACION_CONSECUENCIA = MEDIDA_VALORACION_CONSECUENCIA,
                MEDIDA_VALORACION_PROBABILIDAD = MEDIDA_VALORACION_PROBABILIDAD,
                CONDICION = CONDICION,
                FECHA_CREACION = DateTime.Now
            };
            ActividadJSONPOST json_return = new ActividadJSONPOST();
            if (ID_DIVISION != 0)
            {
                nuevo.ID_DIVISION = ID_DIVISION;
                json_return.ID_DIVISION = (int)nuevo.ID_DIVISION;
            }
            if (ID_AREA != 0)
            {
                nuevo.ID_AREA = ID_AREA;
                json_return.ID_AREA = (int)nuevo.ID_AREA;
            }
            
            bd.TBL_ACTIVIDAD_EVALUADA.InsertOnSubmit(nuevo);
            bd.SubmitChanges();
            for (int i = 0; i < MEDIDAS.Length; i++)
            {
                TBL_PELIGRO_MEDIDA nuevo_peligro_medida = new TBL_PELIGRO_MEDIDA()
                {
                    ID_ACTIVIDAD_EVALUADA = nuevo.ID_ACTIVIDAD_EVALUADA,
                    ID_MEDIDAS_DE_CONTROL = MEDIDAS[i],
                    FECHA_CREACION = DateTime.Now
                    
                };
                bd.TBL_PELIGRO_MEDIDA.InsertOnSubmit(nuevo_peligro_medida);
                bd.SubmitChanges();
            }

            
            json_return.ID_ACTIVIDAD_EVALUADA = (int)nuevo.ID_ACTIVIDAD_EVALUADA;

            json_return.ID_ACTIVIDAD_GENERAL = (int)nuevo.ID_ACTIVIDAD_GENERAL;
            json_return.ID_CARGO = (int)nuevo.ID_CARGO;
            
            json_return.ID_ACTIVIDAD_ESPECIFICA = (int)nuevo.ID_ACTIVIDAD_ESPECIFICA;
            json_return.ID_DEPARTAMENTO_ORGANIZACION = (int)nuevo.ID_DEPARTAMENTO_ORGANIZACION;
            json_return.ID_PELIGRO = (int)nuevo.ID_PELIGRO;
            
            json_return.VALORACION_CONSECUENCIA = (int)nuevo.VALORACION_CONSECUENCIA;
            json_return.VALORACION_PROBABILIDAD = (int)nuevo.VALORACION_PROBABILIDAD;
            json_return.MEDIDA_VALORACION_CONSECUENCIA = (int)nuevo.MEDIDA_VALORACION_CONSECUENCIA;
            json_return.MEDIDA_VALORACION_PROBABILIDAD = (int)nuevo.MEDIDA_VALORACION_PROBABILIDAD;
            json_return.CONDICION = (int)nuevo.CONDICION;
            json_return.FECHA_CREACION = (DateTime)nuevo.FECHA_CREACION;

            json_return.MEDIDAS = MEDIDAS;
            objJSON.items = json_return;
            objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
            objJSON.success = true;
            */

            HttpContext.Current.Session["TempActividadEvaluada"] = null;
            objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
            objJSON.success = true;
            return objJSON;
        }

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ACTIVIDAD_EVALUADA> Get(string id)
		{
            JSONCollection<TBL_ACTIVIDAD_EVALUADA> objJSON = new JSONCollection<TBL_ACTIVIDAD_EVALUADA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ACTIVIDAD_EVALUADA where variable.ID_ACTIVIDAD_EVALUADA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ACTIVIDAD_EVALUADA> Update(string id, TBL_ACTIVIDAD_EVALUADA nuevo)
		{

            JSONCollection<TBL_ACTIVIDAD_EVALUADA> objJSON = new JSONCollection<TBL_ACTIVIDAD_EVALUADA>();
            try
            {
                var objeto = (from variable in bd.TBL_ACTIVIDAD_EVALUADA
                              where variable.ID_ACTIVIDAD_EVALUADA == int.Parse(id)
                              select variable).Single();
                objeto.ID_ACTIVIDAD_GENERAL = nuevo.ID_ACTIVIDAD_GENERAL;
				objeto.ID_CARGO = nuevo.ID_CARGO;
				objeto.ID_DIVISION = nuevo.ID_DIVISION;
				objeto.ID_ACTIVIDAD_ESPECIFICA = nuevo.ID_ACTIVIDAD_ESPECIFICA;
				objeto.ID_DEPARTAMENTO_ORGANIZACION = nuevo.ID_DEPARTAMENTO_ORGANIZACION;
				objeto.ID_PELIGRO = nuevo.ID_PELIGRO;
				objeto.ID_AREA = nuevo.ID_AREA;
				objeto.VALORACION_CONSECUENCIA = nuevo.VALORACION_CONSECUENCIA;
				objeto.VALORACION_PROBABILIDAD = nuevo.VALORACION_PROBABILIDAD;
				objeto.MEDIDA_VALORACION_CONSECUENCIA = nuevo.MEDIDA_VALORACION_CONSECUENCIA;
				objeto.MEDIDA_VALORACION_PROBABILIDAD = nuevo.MEDIDA_VALORACION_PROBABILIDAD;
				objeto.FECHA_CREACION = nuevo.FECHA_CREACION;
				objeto.CONDICION = nuevo.CONDICION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
					   
		}
		
		[WebInvoke(UriTemplate = "{id}", Method = "DELETE", RequestFormat = WebMessageFormat.Json)]
		public void Delete(string id)
		{
			var objeto = (from variable in bd.TBL_ACTIVIDAD_EVALUADA
							where variable.ID_ACTIVIDAD_EVALUADA == int.Parse(id)
							select variable).First();

			bd.TBL_ACTIVIDAD_EVALUADA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_ACTIVIDAD_GENERAL")){
					return "ID_ACTIVIDAD_GENERAL";
				}
				if (_sort.Equals("ID_CARGO")){
					return "ID_CARGO";
				}
				if (_sort.Equals("ID_DIVISION")){
					return "ID_DIVISION";
				}
				if (_sort.Equals("ID_ACTIVIDAD_ESPECIFICA")){
					return "ID_ACTIVIDAD_ESPECIFICA";
				}
				if (_sort.Equals("ID_DEPARTAMENTO_ORGANIZACION")){
					return "ID_DEPARTAMENTO_ORGANIZACION";
				}
				if (_sort.Equals("ID_PELIGRO")){
					return "ID_PELIGRO";
				}
				if (_sort.Equals("ID_AREA")){
					return "ID_AREA";
				}
				if (_sort.Equals("VALORACION_CONSECUENCIA")){
					return "VALORACION_CONSECUENCIA";
				}
				if (_sort.Equals("VALORACION_PROBABILIDAD")){
					return "VALORACION_PROBABILIDAD";
				}
				if (_sort.Equals("MEDIDA_VALORACION_CONSECUENCIA")){
					return "MEDIDA_VALORACION_CONSECUENCIA";
				}
				if (_sort.Equals("MEDIDA_VALORACION_PROBABILIDAD")){
					return "MEDIDA_VALORACION_PROBABILIDAD";
				}
				if (_sort.Equals("FECHA_CREACION")){
					return "FECHA_CREACION";
				}
				if (_sort.Equals("CONDICION")){
					return "CONDICION";
				}

			}
			return "ID_ACTIVIDAD_EVALUADA";
		}
	}
}