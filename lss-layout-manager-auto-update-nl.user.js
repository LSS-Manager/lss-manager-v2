
// ==UserScript==
// @name         LSS Manager AutoUpdate 
// @namespace    http://www.lss-manager.de
// @version      2.6
// @description  Extension for leistellenspiel/missionchief/meldkamerspel/coordinatormissii
// @author       lost & northdegree
// @include      http://*meldkamerspel.com*
// @include      https://*meldkamerspel.com*
// @grant        none
// @run          document-start
// ==/UserScript==

$('head').append('<script id="lss_manager_js-nl" src="https://proxy.lss-manager.de:8443/lss-layout-manager-nl.user.js" type="text/javascript"></script>');
