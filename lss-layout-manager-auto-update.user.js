// ==UserScript==
// @name         LSS Manager AutoUpdate 
// @namespace    http://www.lss-manager.de
// @version      2.61
// @description  Mit der Tastatur Alarmieren oder sonstiges
// @author       lost & northdegree
// @include      https://www.leitstellenspiel.de/
// @include      https://www.leitstellenspiel.de/*
// @include      https://www.missionchief.com/*
// @include      https://www.missionchief.com/
// @version      1
// @grant        none
// @run          document-start
// ==/UserScript==

if(typeof(jQuery) == 'undefined')
{
   throw new Error("LSS-Manager: No jQuery! Aborting!");
}

$('head').append('<script id="lss_manager_js" src="https://proxy.lss-manager.de/lss-layout-manager.user.js" type="text/javascript"></script>');
