// ==UserScript==
// @name         LSS Manager AutoUpdate 
// @namespace    http://www.lss-manager.de
// @version      2.6
// @description  Mit der Tastatur Alarmieren oder sonstiges
// @author       lost & northdegree
// @include      http://www.leitstellenspiel.de/
// @include      http://www.leitstellenspiel.de/*
// @include      http://www.missionchief.com/*
// @include      http://www.missionchief.com/
// @version      1
// @grant        none
// @run          document-start
// ==/UserScript==

if(typeof(jQuery) == 'undefined')
{
   throw new Error("LSS-Manager: No jQuery! Aborting!");
}

$('head').append('<script id="lss_manager_js" src="https://proxy.lss-manager.de/lss-layout-manager.user.js" type="text/javascript"></script>');
