Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsDatoEvento"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.DatoEvento', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
