﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="tree-data.aspx.cs" Inherits="WCF_ENAP.js.tree_data" %>
<% 
    bool isLogued = false;
    WCF_ENAP.EnapUser user;
    if (Session["enap-log"] != null) {
        try
        {
            user = (WCF_ENAP.EnapUser)Session["enap-log"];
            isLogued = user.IsLogued;
        }
        catch (Exception ex){}
    }
%>
{ 
    text: '.',
    children: [
        <% if (isLogued) { %>
        {
            text:'Eventos',
            expanded: false,
			iconCls: "evento-icon",
            children:[
                {"text":"Lista Eventos","id":"EventoList","leaf":true,iconCls: "add-evento-icon","stores":['dsEvento']},
				{"text":"Ingreso de Evento","id":"e0063","leaf":true,iconCls: "add-evento-icon","stores":[
                    'dse0063',
                    'dsEmpresa',
                    'dsPeligro',
                    'dsCargo',
                    'dsEventoEmpresa',
                    'dsOrganizacion',
                    'dsDepartamento',
                    'dsDivision',
                    'dsArea',
                    'dsTrabajador',
                    'dsGrupo',
                    'dsEvento',
                    'dsCausa',
                    'dsEventoEmpresa',
                    'dsMedidaDeControl',
                    'dsPeligroMedida',
                    'dsAccion',
                    'dsAccionCorrectiva',
                    'dsHerramienta',
                    'dsPersonaPeligroTipoIncidente'
                ]},
				{"text":"Seguimiento","id":"SeguimientoEvento","leaf":true,iconCls: "seguimiento-icon","stores":[]},
				{"text":"Busqueda","id":"BusquedaEvento","leaf":true,iconCls: "buscar-icon","stores":[]}
            ]
        },
        <% } %>
        <% if (isLogued) { %>
			{
				text:'Programa Anual',
				expanded: false,
				iconCls: "programa-icon",
				children:[
					{"text":"Crear Programa","id":"ProgramaAnual","leaf":true,iconCls: "add-programaanual-icon","stores":[
                        'dsProgramaAnual',
                        'dsOrganizacion',
                        'dsDepartamento',
                        'dsDivision',
                        'dsCargo',
                        'dsFrecuencia',
                        'dsEvidencia',
                        'dsActividadProgramaAnualPrevencion',
                        'dsGraphAvanceProgramaAnual',
                        'dsMeses'
                    ]},
					{"text":"Busca Programa Anual","id":"BuscaProgramaAnual","leaf":true,iconCls: "buscar-icon","stores":[]}
				]
			},
            <% } %>
            <% if (isLogued) { %>
			{
				text:'Reportes',
				expanded: false,
				iconCls: "reportes-icon",
				children:[
					{"text":"Semanal","id":"Semanal","leaf":true,iconCls: "reportes-icon","stores":[]},
					{"text":"Mensual","id":"Mensual","leaf":true,iconCls: "reportes-icon","stores":[]},
					{"text":"Anual","id":"Anual","leaf":true,iconCls: "reportes-icon","stores":[]},
					{"text":"Filtro & Análisis","id":"Accion","leaf":true,iconCls: "buscar-icon","stores":[]}
				]
			},
			<%} %>
			{
				text:'Matriz de Riesgo',
				expanded: false,
				iconCls: "matriz-icon",
				children:[
					{"text":"Crear Matriz de Riesgo","id":"EvaluaActividadEspecifica","leaf":true,iconCls: "add-matriz-icon","stores":[
						'dsOrganizacion',
						'dsDepartamento',
						'dsDivision',
						'dsArea',
						'dsActividadGeneral',
						'dsCargo',
						'dsActividadEspecifica',
						'dsPeligro',
						'dsPeligroMedida',
						'dsMedidaDeControl',
						'dsTempActividadEvaluada',
						'dsActividadEvaluada',
                        'dsMatrizRiesgo'
					]},
					
					{"text":"Busca Matriz de Riesgo","id":"BuscaMatrizRiesgo","leaf":true,iconCls: "buscar-icon","stores":[
						'dsOrganizacion',
						'dsActividadEspecifica',
						'dsPeligro',
						'dsDivision',
						'dsArea',
						'dsDepartamento',
						'dsActividadGeneral',
						'dsCargo',
						'dsActividadEvaluada',
                        'dsMatrizRiesgo'
					]}
				]	
		},
        <% if (isLogued) { %>
        {
            text:'Administración',
            expanded: false,
			iconCls: "administracion-icon",
            children:[
				{"text":"Grupos","id":"Grupo","leaf":true,iconCls: "grupo-icon","stores":["dsGrupo"]},
				{"text":"Usuarios","id":"Usuario","leaf":true,iconCls: "user-icon","stores":["dsEmpresa","dsUsuario" ]},
				{"text":"Empresas Contratistas","id":"Empresa","leaf":true,"stores":["dsEmpresa"]},
				{"text":"Usuario Grupo","id":"UsuarioGrupo","leaf":true,"stores":["dsUsuarioGrupo"]},
                {"text":"Generador de Menú","id":"MenuGenerator","leaf":true,iconCls: "generator-editor-icon","stores":['dsStores','dsNodes','dsNode','dsGrupo','dsGrupoPrivilegio']}
			]
		},
        <% } %>
        <% if(isLogued==false) { %>
        {
            text:'Login',
            id: 'Login',
            leaf:true,
            stores:[],
            iswin:true,
			iconCls: "login-icon",
            expanded: false,
            children:[]
		}
        <% } else { %>
        {
            text:'Logout',
            id: 'Logout',
			iconCls: "logout-icon",
            expanded: false,
            children:[]
		}
        <% } %>
	]
}