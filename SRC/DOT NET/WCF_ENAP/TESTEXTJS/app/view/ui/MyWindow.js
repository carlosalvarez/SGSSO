/*
 * File: app/view/ui/MyWindow.js
 * Date: Fri Aug 19 2011 13:16:53 GMT-0400 (Hora est. Sudamérica Pacífico)
 *
 * This file was generated by Ext Designer version 1.2.0.
 * http://www.sencha.com/products/designer/
 *
 * This file will be auto-generated each and everytime you export.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.ui.MyWindow', {
    extend: 'Ext.window.Window',

    height: 531,
    width: 709,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',

    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'form_grupo',
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Label',
                        anchor: '100%',
                        name: 'NOMBRE_GRUPO'
                    },
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'Label',
                        anchor: '100%',
                        name: 'DESCRIPCION_GRUPO'
                    }
                ],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        new_object = Ext.ModelManager.create(this.up('form').getForm().getValues(), 'Grupo');
                        errors = new_object.validate();
                        form = this.up('form').getForm();
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsGrupo').insert(0, new_object);
                            form.reset();
                        } else {
                            form.markInvalid(errors);
                        }
                        this.enable(true);
                    }
                }]
            },
            {
                xtype: 'gridpanel',
                margin: '5 5 5 5',
                title: 'My Grid Panel',
                store: 'dsGrupo',
                itemId: 'grid_grupo',
                columns: [
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'ID_GRUPO',
                        text: 'ID_GRUPO'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'NOMBRE_GRUPO',
                        editor: {
                            type: 'textfield'
                        },
                        text: 'NOMBRE_GRUPO'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'DESCRIPCION_GRUPO',
                        editor: {
                            type: 'textfield'
                        },
                        text: 'DESCRIPCION_GRUPO'
                    }
                ],
                plugins: [
                    Ext.create('Ext.grid.plugin.RowEditing', {})
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsGrupo',
                        dock: 'bottom'
                    },
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Agregar'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar'
                            }
                        ]
                    }
                ],
                listeners: {
                    itemdblclick: function (view, records) {
                        if (records[0]) {
                            Ext.getCmp("form_grupo").getForm().loadRecord(records[0]);
                        }
                    },
					render(grid, options ) {
						var idx = this.editor.store.find('value', value); 	
						return idx !== -1 ? this.editor.store.getAt(idx).get('label') : '' 

					}
                },
                selModel: Ext.create('Ext.selection.RowModel', {
                    allowDeselect: true,
                    mode: 'MULTI'
                })
            }
        ];
        me.callParent(arguments);
    }
});