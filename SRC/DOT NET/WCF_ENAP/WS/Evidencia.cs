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

/**
  *NameSpace.
  */
namespace WCF_ENAP
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
	public class Evidencia
	{
		private DataClassesEnapDataContext bd;

		public Evidencia()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_EVIDENCIA>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_EVIDENCIA>> objJSON = new JSONCollection<List<TBL_EVIDENCIA>>();
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
                var query = bd.TBL_EVIDENCIA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_EVIDENCIA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_EVIDENCIA.Count<TBL_EVIDENCIA>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_EVIDENCIA> Create(string NOMBRE_EVIDENCIA)
		{
            JSONCollection<TBL_EVIDENCIA> objJSON = new JSONCollection<TBL_EVIDENCIA>();
            try
            {
                TBL_EVIDENCIA nuevo = new TBL_EVIDENCIA()
                {
                    NOMBRE_EVIDENCIA = NOMBRE_EVIDENCIA
                };
                bd.TBL_EVIDENCIA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_EVIDENCIA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_EVIDENCIA> Get(string id)
		{
            JSONCollection<TBL_EVIDENCIA> objJSON = new JSONCollection<TBL_EVIDENCIA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_EVIDENCIA where variable.ID_EVIDENCIA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_EVIDENCIA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_EVIDENCIA> Update(string id, TBL_EVIDENCIA nuevo)
		{

            JSONCollection<TBL_EVIDENCIA> objJSON = new JSONCollection<TBL_EVIDENCIA>();
            try
            {
                var objeto = (from variable in bd.TBL_EVIDENCIA
                              where variable.ID_EVIDENCIA == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_EVIDENCIA = nuevo.NOMBRE_EVIDENCIA;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_EVIDENCIA.Count();
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
			var objeto = (from variable in bd.TBL_EVIDENCIA
							where variable.ID_EVIDENCIA == int.Parse(id)
							select variable).First();

			bd.TBL_EVIDENCIA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_EVIDENCIA")){
					return "NOMBRE_EVIDENCIA";
				}

			}
			return "ID_EVIDENCIA";
		}
	}
}