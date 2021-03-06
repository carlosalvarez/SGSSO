Ext.define('WCF_ENAP.model.SubActividad', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_SUB_ACTIVIDAD',
    fields: [{"name":"ID_SUB_ACTIVIDAD","type":"int","useNull":true},{"name":"ID_EVIDENCIA","type":"int"},{"name":"ID_PROGRAMA_ACTIVIDAD","type":"int"},{"name":"NOMBRE_SUB_ACTIVIDAD","type":"string"},{"name":"TIPO_FRECUENCIA","type":"int"},{"name":"CANTIDAD_ACTIVIDADES","type":"string"}],
    validations: [{"field":"ID_EVIDENCIA","type":"length","max":"11"},{"field":"ID_PROGRAMA_ACTIVIDAD","type":"length","max":"11"},{"field":"NOMBRE_SUB_ACTIVIDAD","type":"length","max":"200"},{"field":"TIPO_FRECUENCIA","type":"length","max":"11"},{"field":"CANTIDAD_ACTIVIDADES","type":"length","max":"200"}]
});
