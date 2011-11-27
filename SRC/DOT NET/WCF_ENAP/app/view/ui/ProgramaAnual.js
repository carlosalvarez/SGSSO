﻿Ext.define('WCF_ENAP.view.ui.ProgramaAnual', {
    requires: [
        'Ext.ux.RowExpander',
        'Ext.ux.grid.column.ProgressColumn',
        'Ext.ux.form.field.ClearButton'
    ],
    extend: 'Ext.panel.Panel',
    autoScroll: true,
    title: 'Programa Anual',
    id: 'panel-ProgramaAnual',
    contextMenuFilters: null,
    initComponent: function () {
        var me = this,
            winActividadProgramaAnual,
            yearsList = [],
            yearStep = 4,
            yearNow = (new Date()).getFullYear();


        for (var yInicio = (yearNow + yearStep); yInicio > (yearNow - yearStep); yInicio--) {
            yearsList.push([yInicio]);
        }



        Ext.StoreManager.lookup('dsActividadProgramaAnualPrevencion').on('datachanged', function (store, opts) {
            Ext.getCmp('graphAvanceProgramaAnual').setLoading(true);
            var selectedYear = Ext.getCmp('panel-ProgramaAnual').contextMenuFilters.getComponent(0).getValue();
            Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual').load({
                params: {
                    'ANO_INICIO': selectedYear
                },
                callback: function (records) {
                    Ext.getCmp('graphAvanceProgramaAnual').setLoading(false);
                }
            });
            var records = Ext.getCmp('grid_programas_list').getSelectionModel().getSelection();
            Ext.StoreManager.lookup('dsGraphAvanceProgramaAnualById').load({
                params: { 'ID_PROGRAMA_ANUAL': records[0].get('ID_PROGRAMA_ANUAL') },
                callback: function (records, operation, success) {
                    Ext.getCmp('chart_prc_p_r_by_programa').setLoading(false);
                    if (records.length == 0) {
                        Ext.getCmp('chart_prc_p_r_by_programa').surface.removeAll();
                        Ext.getCmp('chart_prc_p_r_by_programa').redraw(); ;
                    }
                }
            });
        });
        Ext.StoreManager.lookup('dsProgramaAnual').on('datachanged', function (store, opts) {
            var selectedYear = Ext.getCmp('panel-ProgramaAnual').contextMenuFilters.getComponent(0).getValue();
            Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual').load({
                params: {
                    'ANO_INICIO': selectedYear
                },
                callback: function (records) {
                    //Ext.getCmp('graphAvanceProgramaAnual').setLoading(false);
                }
            });
        });
        var groupingSummary = Ext.create('Ext.grid.feature.GroupingSummary', {
            groupHeaderTpl: '{name}'
        });
        me.contextMenuFilters = Ext.create('Ext.menu.Menu', {
            items: [
		        {
		            xtype: 'combobox',
		            store: Ext.create('Ext.data.ArrayStore', {
		                fields: ['ANO'],
		                data: yearsList
		            }),
		            margin: '0 0 0 5',
		            fieldLabel: 'Año',
		            valueField: 'ANO',
		            displayField: 'ANO',
		            name: 'ANO_INICIO',
		            listeners: {
		                change: function (field, newValue, oldValue, eOpts) {
		                    Ext.StoreManager.lookup('dsProgramaAnual').load({
		                        params: {
		                            'ANO_INICIO': newValue
		                        }
		                    });
		                    this.up('menu').hide();
		                }
		            }
		        },
                {
                    xtype: 'combobox',
                    plugins: ['clearbutton'],
                    margin: '0 0 0 5',
                    name: 'ID_ORGANIZACION',
                    fieldLabel: 'Organización',
                    displayField: 'NOMBRE_ORGANIZACION',
                    store: 'dsOrganizacion',
                    emptyText: 'Organización',
                    valueField: 'ID_ORGANIZACION',
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',
                    lastQuery: '',
                    selectOnFocus: true,
                    listeners: {
                        'change': function (cmb, newValue, oldValue, eOpts) {
                            var cmbDepto = this.next('combobox');
                            cmbDepto.clearValue();
                            if (newValue != null) {
                                Ext.data.StoreManager.lookup('dsDepartamento').load({
                                    params: { 'ID_ORGANIZACION': newValue },
                                    callback: function (records, operation, success) {
                                        cmbDepto.setDisabled(!(Ext.isArray(records) && records.length > 0));
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    plugins: ['clearbutton'],
                    margin: '0 0 0 5',
                    disabled: true,
                    name: 'ID_DEPARTAMENTO_ORGANIZACION',
                    fieldLabel: 'Departamento',
                    displayField: 'NOMBRE_DEPARTAMENTO',
                    store: 'dsDepartamento',
                    valueField: 'ID_DEPARTAMENTO_ORGANIZACION',
                    emptyText: 'Departamento',
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',
                    lastQuery: '',
                    selectOnFocus: true,
                    listeners: {
                        'change': function (cmb, newValue, oldValue, eOpts) {
                            var cmbDiv = this.next('combobox'); ;
                            cmbDiv.clearValue();
                            if (newValue != null) {
                                Ext.data.StoreManager.lookup('dsDivision').load({
                                    params: { 'ID_DEPARTAMENTO': newValue },
                                    callback: function (records, operation, success) {
                                        cmbDiv.setDisabled(!(Ext.isArray(records) && records.length > 0));
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    plugins: ['clearbutton'],
                    height: 50,
                    disabled: true,
                    margin: '0 0 0 5',
                    name: 'ID_DIVISION',
                    fieldLabel: 'División',
                    displayField: 'NOMBRE_DIVISION',
                    store: 'dsDivision',
                    valueField: 'ID_DIVISION',
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText: 'División',
                    queryMode: 'local',
                    lastQuery: '',
                    selectOnFocus: true,
                    listeners: {
                        'change': function (cmb, newValue, oldValue, eOpts) {
                            var selectedYear = Ext.getCmp('panel-ProgramaAnual').contextMenuFilters.getComponent(0).getValue();
                            if (newValue != null && Ext.isNumber(newValue)) {
                                
                                Ext.StoreManager.lookup('dsProgramaAnual').load({
                                    params: {
                                        'ANO_INICIO': selectedYear,
                                        'ID_DIVISION': newValue
                                    },
                                    callback: function (records) {
                                        //Ext.getCmp('graphAvanceProgramaAnual').setLoading(false);
                                    }
                                });
                            } else {
                                Ext.StoreManager.lookup('dsProgramaAnual').load({
                                    params: {
                                        'ANO_INICIO': selectedYear,
                                        'ID_DIVISION': 0
                                    },
                                    callback: function (records) {
                                        //Ext.getCmp('graphAvanceProgramaAnual').setLoading(false);
                                    }
                                });
                            }
                        }
                    }
                }
	        ]
        });
        Ext.applyIf(me, {
            items: [
            {
                height: 200,
                title: 'Consolidado de Avances de Programas Por División',
                layout: 'fit',
                flex: 1,
                margin: '5 10 5 10',
                items: [
                    {
                        xtype: 'chart',
                        store: 'dsGraphAvanceProgramaAnual',
                        id: 'graphAvanceProgramaAnual',
                        flex: 1,
                        shadow: true,
                        animate: true,
                        axes: [
                            {
                                type: 'Numeric',
                                fields: [
                                    'PRC_TOTAL'
                                ],
                                position: 'left',
                                minimum: 0,
                                maximum: 100,
                                grid: true,
                                label: {
                                    renderer: Ext.util.Format.numberRenderer('0,0'),
                                    font: '10px Arial'
                                },
                                title: '% Avance'
                            },
                            {
                                type: 'Category',
                                fields: [
                                    'NOMBRE_DIVISION'
                                ],
                                position: 'bottom',
                                label: {
                                    renderer: function (v) {
                                        return Ext.String.ellipsis(v, 15, false);
                                    },
                                    font: '9px Arial',
                                    rotate: {
                                        degrees: 270
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                type: 'column',
                                display: 'insideEnd',
                                'text-anchor': 'middle',
                                axis: 'left',
                                highlight: true,
                                style: {
                                    fill: '#456d9f'
                                },
                                highlightCfg: {
                                    fill: '#a2b5ca'
                                },
                                label: {
                                    contrast: true,
                                    display: 'insideEnd',
                                    field: 'PRC_TOTAL',
                                    color: '#000',
                                    'text-anchor': 'middle',
                                    renderer: Ext.util.Format.numberRenderer('0.0%')

                                },
                                listeners: {
                                    'itemmouseup': function (item) {
                                        var barIdDivision = item.storeItem.get('ID_DIVISION'),
                                            store = Ext.StoreManager.lookup('dsProgramaAnual'),
                                            series = Ext.getCmp('graphAvanceProgramaAnual').series.get(0),
                                            selectionModel = Ext.getCmp('grid_programas_list').getSelectionModel(),
                                            records = [];
                                        store.each(function (record) {
                                            if (record.get('ID_DIVISION') == barIdDivision) {
                                                records.push(record);
                                            }
                                        });
                                        selectionModel.select(records);
                                    }
                                },
                                xField: 'NOMBRE_DIVISION',
                                yField: [
                                    'PRC_TOTAL'
                                ]
                            }
                        ]
                    }]
            },
                {
                    xtype: 'panel',
                    height: 562,
                    border: 0,
                    margin: '5 5 5 5',
                    layout: {
                        type: 'column'
                    },
                    title: '',
                    items: [
                        {
                            xtype: 'gridpanel',
                            height: 400,
                            margin: '5 5 5 5',
                            id: 'grid_programas_list',
                            title: 'Listado de Programas',
                            store: 'dsProgramaAnual',
                            columnWidth: 0.6,
                            multiSelect: true,
                            viewConfig: {

                        },
                        features: [groupingSummary],
                        plugins: [
                            {
                                ptype: 'rowexpander',
                                pluginId: 'rowexpanderprograma',
                                rowBodyTpl: [
                                    '<div style="margin-left: 15px;"><div style="margin-left: 15px; float:left;"><h3>Objetivo:</h3>{OBJETIVO}<br /><h3>Meta:</h3>{META}<br /></div></div>'
                                ]
                            }
		                ],
                        tools: [{
                            type: 'gear',
                            handler: function (e, target, panelHeader, tool) {
                                me.contextMenuFilters.showAt(e.getXY());
                            }
                        }],
                        columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_PROGRAMA',
                                    text: 'Nombre del Programa',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ID_DIVISION',
                                    text: 'División',
                                    flex: 0.3,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        return record.get('NOMBRE_DIVISION');
                                    }
                                },
                                {
                                    xtype: 'progresscolumn',
                                    dataIndex: 'PERCENT_TOTAL',
                                    text: '% Avance',
                                    flex: 0.2
                                }
                            ],
                        dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'btn-add',
                                    text: 'Agregar Programa',
                                    handler: function () {
                                        Ext.application({
                                            name: 'WCF_ENAP',
                                            stores: ['dsMeses', 'dsProgramaAnual', 'dsDivision', 'dsDepartamento', 'dsOrganizacion'],
                                            launch: function () {
                                                Ext.QuickTips.init();
                                                var addNuevoPrograma = Ext.create('WCF_ENAP.view.ui.NuevoPrograma', {}),
                                                    showWindow = Ext.create('Ext.window.Window', {
                                                        title: 'Agrega un Nuevo Programa',
                                                        maximizable: true,
                                                        width: 800,
                                                        items: [addNuevoPrograma]
                                                    });

                                                groupingSummary.expandAll();

                                                groupingSummary.disable();
                                                addNuevoPrograma.show();
                                                showWindow.show();
                                                showWindow.on('beforedestroy', function (cmp, eOpts) {
                                                    groupingSummary.enable();
                                                });

                                            }
                                        });
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    iconCls: 'btn-delete',
                                    itemId: 'btn_delete_programa',
                                    text: 'Eliminar Seleccionado',
                                    handler: function () {
                                        var store = Ext.StoreManager.lookup('dsProgramaAnual'),
                                            grid = Ext.getCmp('grid_programas_list'),
                                            records = grid.getSelectionModel().getSelection();
                                        store.remove(records);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Colapsar Todo',
                                    iconCls: 'toggle-minus-icon',
                                    handler: function () {
                                        if (this.text == 'Colapsar Todo') {
                                            groupingSummary.collapseAll();
                                            this.setText('Expandir Todo');
                                            this.setIconCls('toggle-plus-icon');
                                        } else {
                                            groupingSummary.expandAll();
                                            this.setText('Colapsar Todo');
                                            this.setIconCls('toggle-minus-icon');
                                        }
                                    }
                                }

                                ]
                        },

                                {
                                    xtype: 'pagingtoolbar',
                                    displayInfo: true,
                                    store: 'dsProgramaAnual',
                                    dock: 'bottom'
                                }
                            ],
                        listeners: {
                            selectionchange: function (model, records) {
                                this.down('#btn_delete_programa').setDisabled(records.length === 0);
                                var json, name, i, l, items, series, fields;
                                if (records[0]) {
                                    var record = records[0];
                                    Ext.getCmp('chart_prc_p_r_by_programa').setLoading(true);
                                    var store = Ext.StoreManager.lookup('dsGraphAvanceProgramaAnualById');
                                    store.load({
                                        params: { 'ID_PROGRAMA_ANUAL': record.get('ID_PROGRAMA_ANUAL') },
                                        callback: function (records, operation, success) {
                                            Ext.getCmp('chart_prc_p_r_by_programa').setLoading(false);
                                            if (records.length == 0) {
                                                Ext.getCmp('chart_prc_p_r_by_programa').surface.removeAll();
                                                Ext.getCmp('chart_prc_p_r_by_programa').redraw();
                                            }
                                        }
                                    });
                                    try {
                                        var series = Ext.getCmp('graphAvanceProgramaAnual').series.get(0),
                                        i, items, l;

                                        series.highlight = true;
                                        series.unHighlightItem();
                                        series.cleanHighlights();
                                        for (i = 0, items = series.items, l = items.length; i < l; i++) {
                                            if (records[0].get('ID_DIVISION') == items[i].storeItem.get('ID_DIVISION')) {
                                                selectedStoreItem = items[i].storeItem;
                                                series.highlightItem(items[i]);
                                                break;
                                            }
                                        }
                                        series.highlight = false;
                                    } catch (e) { }
                                }
                            },
                            afterrender: function (component, eOpts) {

                                var me = this,
                                    plugin = me.getPlugin('rowexpanderprograma'),
                                    view = groupingSummary.view,
                                    viewPlugin = plugin.view;
                                view.on('groupcollapse', function (view, node, group, e, eOpts) {
                                    me.doLayout();
                                });
                                view.on('groupexpand', function (view, node, group, e, eOpts) {
                                    me.doLayout();
                                });

                                viewPlugin.on('groupcollapse', function (view, node, group, e, eOpts) {
                                    me.doLayout();
                                });
                                viewPlugin.on('groupexpand', function (view, node, group, e, eOpts) {
                                    me.doLayout();
                                });
                            },
                            itemdblclick: function (view, record, item, index, e, options) {
                                var idProgramaAnual = record.get("ID_PROGRAMA_ANUAL");


                                var gridProgramaAnual = Ext.create('WCF_ENAP.view.ui.ProgramaAnualPrevencion', {
                                    recordParent: record
                                });
                                winActividadProgramaAnual = Ext.create('Ext.window.Window', {
                                    modal: true,
                                    width: 850,
                                    maximizable: true,
                                    title: record.get('NOMBRE_PROGRAMA'),
                                    items: [gridProgramaAnual]
                                });
                                var formulario = winActividadProgramaAnual.getComponent('form_programa_anual');
                                var form = formulario.getForm();
                                form.loadRecord(record);
                                winActividadProgramaAnual.show();

                            }
                        }
                    },
                    {
                        xtype: 'panel',
                        columnWidth: 0.4,
                        border: 0,
                        items: [
                        //[CHART MESES]
                        {
                        title: 'Porcentaje de Avance Por Mes',
                        margin: '5 5 5 0',
                        bodyPadding: 10,
                        width: 410,
                        height: 400,
                        minHeight: 400,
                        minWidth: 410,
                        layout: 'fit',
                        items: [{
                            xtype: 'chart',
                            animate: false,
                            id: 'chart_prc_p_r_by_programa',
                            store: 'dsGraphAvanceProgramaAnualById',
                            insetPadding: 30,
                            gradients: [{
                                angle: 90,
                                id: 'bar-gradient',
                                stops: {
                                    0: {
                                        color: '#99BBE8'
                                    },
                                    70: {
                                        color: '#77AECE'
                                    },
                                    100: {
                                        color: '#77AECE'
                                    }
                                }
                            }],
                            legend: {
                                position: 'bottom'
                            },
                            axes: [{
                                type: 'Numeric',
                                minimum: 0,
                                maximum: 100,
                                position: 'left',
                                fields: ['PRC_MES_R'],
                                title: false,
                                grid: true,
                                label: {
                                    renderer: Ext.util.Format.numberRenderer('0,0'),
                                    font: '10px Arial'
                                }
                            }, {
                                type: 'Category',
                                position: 'bottom',
                                fields: ['NOMBRE_MES_R'],
                                title: false,
                                grid: true,
                                label: {
                                    font: '11px Arial',
                                    renderer: function (name) {
                                        return name.substr(0, 3);
                                    }
                                }
                            }],
                            series: [{
                                type: 'column',
                                axis: 'left',
                                xField: 'NOMBRE_MES_R',
                                yField: 'PRC_MES_R',
                                style: {
                                    fill: 'url(#bar-gradient)',
                                    'stroke-width': 3
                                },
                                markerConfig: {
                                    type: 'circle',
                                    size: 4,
                                    radius: 4,
                                    'stroke-width': 0,
                                    fill: '#38B8BF',
                                    stroke: '#38B8BF'
                                }
                            }, {
                                type: 'line',
                                axis: 'left',
                                xField: 'NOMBRE_MES_R',
                                yField: 'PROGRAMADO',
                                tips: {
                                    trackMouse: true,
                                    width: 130,
                                    height: 25,
                                    renderer: function (storeItem, item) {
                                        this.setTitle(storeItem.get('PROGRAMADO') + ' Programada(s) ');
                                    }
                                },
                                style: {
                                    fill: '#18428E',
                                    stroke: '#18428E',
                                    'stroke-width': 1
                                },
                                markerConfig: {
                                    type: 'circle',
                                    size: 4,
                                    radius: 4,
                                    'stroke-width': 0,
                                    fill: '#18428E',
                                    stroke: '#18428E'
                                }
                            }, {
                                type: 'line',
                                axis: 'left',
                                xField: 'NOMBRE_MES_R',
                                yField: 'REALIZADO',
                                style: {
                                    fill: '#38B8BF'
                                },
                                tips: {
                                    trackMouse: true,
                                    width: 130,
                                    height: 25,
                                    renderer: function (storeItem, item) {
                                        this.setTitle(storeItem.get('REALIZADO') + ' realizada(s)');
                                    }
                                }
                            }]
                        }]
                    }
                    //[/CHART MESES]
                    ]
                }

                    ]
            }
            ]
        });

        me.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.contextMenuFilters.getComponent(0).select((new Date()).getFullYear());
        me.contextMenuFilters.getComponent(0).checkChange();
    }
});