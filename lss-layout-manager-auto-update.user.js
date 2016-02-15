// ==UserScript==
// @name         LSS Manager AutoUpdate 
// @namespace    http://www.lss-manager.de
// @version      2.5
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
   document.body.innerHTML += '<br><h3 style="color:red;">Ja, LSS ist grad down<br><br><img src="data:image/jpeg;base64,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"><br>Es werden schon genug Leute das Forum deswegen vollspammen.</h3>';
   throw new Error("No jQuery! Aborting!");
}

$('head').append('<script src="http://proxy.lss-manager.de:8080/lss-layout-manager-2.dev.js" type="text/javascript"></script>');
