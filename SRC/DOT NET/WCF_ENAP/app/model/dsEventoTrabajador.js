Ext.define('WCF_ENAP.model.EventoTrabajador', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVENTO_TRABAJADOR',
    fields: [{"name":"ID_EVENTO_TRABAJADOR","type":"int","useNull":true},{"name":"ID_EVENTO_EMPRESA","type":"int"},{"name":"ID_TRABAJADOR","type":"int"},{"name":"ID_MATRIZ","type":"int"},{"name":"FECHA_PRESENTACION_HOSPITAL","type":"date"},{"name":"FECHA_ALTA_MEDICA","type":"date"},{"name":"TIPO_LESION","type":"int"}],
    validations: [{"field":"ID_EVENTO_EMPRESA","type":"length","max":"11"},{"field":"ID_TRABAJADOR","type":"length","max":"11"},{"field":"ID_MATRIZ","type":"length","max":"11"},{"field":"TIPO_LESION","type":"length","max":"11"}]
});
