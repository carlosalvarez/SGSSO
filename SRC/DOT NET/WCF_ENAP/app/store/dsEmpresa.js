Ext.define('WCF_ENAP.model.Empresa', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EMPRESA',
    fields: [{"name":"ID_EMPRESA","type":"int","useNull":true},{"name":"NOMBRE_EMPRESA","type":"string"},{"name":"DIRECCION_EMPRESA","type":"string"},{"name":"FONO_EMPRESA","type":"string"},{"name":"EMAIL_EMPRESA","type":"string"},{"name":"NOMBRE_CONTRATO","type":"string"}],
    validations: [{"field":"NOMBRE_EMPRESA","type":"length","max":"150"},{"field":"DIRECCION_EMPRESA","type":"length","max":"250"},{"field":"FONO_EMPRESA","type":"length","max":"20"},{"field":"EMAIL_EMPRESA","type":"length","max":"150"},{"field":"NOMBRE_CONTRATO","type":"length","max":"250"}]
});
Ext.define('WCF_ENAP.store.dsEmpresa', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsEmpresa',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Empresa',
            proxy: {
                type: 'rest',
                url: '/Empresa/',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount',
                    successProperty: 'success'
                }
            }
        }, cfg)]);
    }
});