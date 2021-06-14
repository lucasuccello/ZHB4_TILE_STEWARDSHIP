sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";
        var oController;
		return Controller.extend("zhb4.zhb4_tile_misdatos.controller.Tile", {
            onInit: function () {
                oController = this;
                this.oView = this.getView();
                var oRootPath = jQuery.sap.getModulePath("zhb4.zhb4_tile_fijacion"); // your resource root
                var oImageModel = new sap.ui.model.json.JSONModel({
                    path: oRootPath
                });
                this.oView.setModel(oImageModel, "imageModel");
                this.settearTile();
            },

            settearTile: function(){
                oController.getView().getModel().read("/statusSeccionesSet", {
                    success: function (oData, oResponse) {
                        if  (oData.Status === "1"){
                            this.getView().byId("_tileContent").setFooter("Actualizado");
                            this.getView().byId("_tileContent").setFooterColor("Good");
                        }else{
                            this.getView().byId("_tileContent").setFooter("Pendiente");
                            this.getView().byId("_tileContent").setFooterColor("Critical");
                        }
                    }.bind(this),
                    error: function (oError) {}
                });
            },

            onPressTile: function (oEvent) {
                oController.oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation");
                var oTarget = {};
                oTarget["semanticObject"] = "misDatos";
                oTarget["action"] = "editar";
                oController.oCrossAppNav.toExternal({
                    target: oTarget
                });
            }
		});
	});
