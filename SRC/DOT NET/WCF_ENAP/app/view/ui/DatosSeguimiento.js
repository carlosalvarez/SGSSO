﻿Ext.define('WCF_ENAP.view.ui.DatosSeguimiento', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],
    modal: true,
    width: 850,
    maximizable: true,
    cmpPadre: null,
    title: 'Seguimiento',
    initComponent: function () {

        var me = this,
        winAcciones;

        me.items = [
						{
						    xtype: 'panel',
						    id: 'form_datos_seguimiento',
						    items: [
										{
										    xtype: 'gridpanel',
										    anchor: '100%',
										    layout: 'anchor',
										    title: 'Listado de Usuarios',
										    store: 'dsEvento',
										    margin: '5 5 5 5',
										    columns: [
				                                        {
				                                            xtype: 'gridcolumn',
				                                            dataIndex: 'NOMBRE_DEPARTAMENTO',
				                                            editor: {
				                                                xtype: 'textfield',
				                                                name: 'NOMBRE_DEPARTAMENTO',
				                                                // allowBlank: false,
				                                                vtype: 'alpha',
				                                                flex: 0.2,
				                                                anchor: '100%'
				                                            },
				                                            text: 'Acciones Corerctivas'
				                                        },
                                                        {
				                                            xtype: 'gridcolumn',
				                                            dataIndex: 'NOMBRE_CARGO',
				                                            editor: {
				                                                xtype: 'combobox',
				                                                margin: '5 5 5 5',
				                                                anchor: '100%',
				                                                name: 'ID_CARGO',
				                                                store: 'dsCargo',
				                                                displayField: 'NOMBRE_CARGO',
				                                                valueField: 'ID_CARGO',
				                                                fieldLabel: 'Responsable',
				                                                emptyText: 'Responsable',
				                                                flex: 0.2,
				                                                allowBlank: false
				                                            },
				                                            text: 'Responsable'
				                                        },
                                                        
				                                        {
				                                            xtype: 'gridcolumn',
				                                            dataIndex: 'FECHA_PLAZO',
				                                            editor: {
				                                                xtype: 'textfield',
				                                                margin: '5 5 5 5',
				                                                anchor: '100%',
				                                                name: 'FECHA_PLAZO',
				                                                allowBlank: false,
				                                                vtype: 'alpha',
				                                                flex: 0.2
				                                            },
				                                            text: 'Fecha Propuesta Ejecucion'
				                                        },
				                                        {
				                                            xtype: 'gridcolumn',
				                                            dataIndex: 'FECHA_REALIZACION',
				                                            editor: {
				                                                xtype: 'textfield',
				                                                name: 'FECHA_REALIZACION',
				                                                allowBlank: false,
				                                                vtype: 'alpha',
				                                                flex: 0.2,
				                                                anchor: '100%'
				                                            },
				                                            text: 'Fecha Ejecucion'
				                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'FECHA_REALIZACION',
                                                            editor: {
                                                                xtype: 'textfield',
                                                                name: 'FECHA_REALIZACION',
                                                                allowBlank: false,
                                                                vtype: 'alpha',
                                                                flex: 0.2,
                                                                anchor: '100%'
                                                            },
                                                            text: 'Estado'
                                                        }
				                                        


				                                    ],
										    viewConfig: {

										    },
										    dockedItems: [
				                                        {
				                                            xtype: 'pagingtoolbar',
				                                            store: 'dsUsuario',
				                                            displayInfo: true,
				                                            dock: 'bottom'
				                                        }
				                                    ],
										    plugins: [
				                                    Ext.create('Ext.grid.plugin.RowEditing', {

				                                    })
				                                ]
										}
									]
						}


			];
        me.callParent(arguments);
    }
});