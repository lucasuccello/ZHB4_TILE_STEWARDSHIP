/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zhb4/zhb4_tile_misdatos/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
