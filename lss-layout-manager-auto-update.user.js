// ==UserScript==
// @name         LSS Layout Manger Auto Update
// @namespace    http://www.lss-manager.de
// @version      2.2
// @description  Mit der Tastatur Alarmieren oder sonstiges
// @author       lost & northdegree
// @include      http://www.leitstellenspiel.de/
// @include      http://www.leitstellenspiel.de/*
// @include      http://www.missionchief.com/*
// @include      http://www.missionchief.com
// @version      1
// @grant        none
// @run          document-start
// ==/UserScript==

var scriptElement = document.createElement( "script" );
scriptElement.type = "text/javascript";
scriptElement.src = "http://lss.lost.design/lss-layout-manager-2.dev.js";

document.body.appendChild(scriptElement);
