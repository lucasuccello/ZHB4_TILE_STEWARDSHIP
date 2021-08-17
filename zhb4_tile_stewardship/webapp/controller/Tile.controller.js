sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";
        var oController;
		return Controller.extend("zhb4.zhb4_tile_stewardship.controller.Tile", {
            onInit: function () {
                oController = this;
                this.oView = this.getView();
                oController._setGrafico();
            },

            _setGrafico: function(){
                this.getView().getModel().read("/StatusSet", {
                    success: function (oData, oResponse) {
                        if  (oData.results.length === 1){
                            this._setValores(oData.results[0]);
                        }
                    }.bind(this),
                    error: function (oError) {}
                });
            },

            _setValores: function(registro){
                var porcentaje = 0.00;

                if  (registro.Modulo1){
                    porcentaje = porcentaje + 25;
                }
                if  (registro.Modulo4){
                    porcentaje = porcentaje + 25;
                }
                
                porcentaje = porcentaje + ( ( 25 * registro.Modulo2) / 100 );
                porcentaje = porcentaje + ( ( 25 * registro.Modulo3) / 100 );

                this.getView().byId("_chart").setValue2(porcentaje);
                this.getView().byId("_chart").setDisplayValue2(Math.ceil(porcentaje).toString() + "%" );
                var delta = 100 - Math.ceil(porcentaje);
                this.getView().byId("_chart").setDeltaDisplayValue(delta.toString() + "%");
                if (porcentaje < 30){
                    this.getView().byId("_chart").setColor("Error");
                }else if (porcentaje >= 30 && porcentaje < 70){
                    this.getView().byId("_chart").setColor("Critical");
                }else{
                    this.getView().byId("_chart").setColor("Good");
                }
            },

            onPressTile: function (oEvent) {
                oController.oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation");
                var oTarget = {};
                oTarget["semanticObject"] = "menu";
                oTarget["action"] = "display";
                oController.oCrossAppNav.toExternal({
                    target: oTarget
                });
            }
		});
	});
