// ==UserScript==
// @name         LSS Layout Manger Auto Update
// @namespace    http://www.lss-manager.de
// @version      1.6
// @description  Mit der Tastatur Alarmieren oder sonstiges
// @author       lost & northdegree
// @include      http://www.leitstellenspiel.de/
// @include      http://www.leitstellenspiel.de/*
// @include      http://www.missionchief.com/*
// @include      http://www.missionchief.com
// @version      1
// @grant        none
// ==/UserScript==

var scriptElement = document.createElement( "script" );
scriptElement.type = "text/javascript";
scriptElement.src = "https://github.com/lostdesign/lss-layout-manager/raw/master/lss-layout-manager.user.js";
document.body.appendChild(scriptElement);