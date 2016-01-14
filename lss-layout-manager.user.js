// ==UserScript==
// @name         LSS Layout Manger
// @namespace    http://www.lss-manager.de
// @version      1.1
// @description  Mit der Tastatur Alarmieren oder sonstiges
// @author       André Weller
// @include      http://www.leitstellenspiel.de/
// @include      http://www.leitstellenspiel.de/*
// @include      http://www.missionchief.com/*
// @include      http://www.missionchief.com
// @version      1
// @grant        none
// ==/UserScript==

$('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
$('head').append('<link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet" type="text/css">');
$(".logo").after("</a><a href='http://forum.leitstellenspiel.de/index.php/Thread/8077-REDESIGNS-by-lost/' style='font-size:12px; font-weight:600; top:20px; left:15%; color:#fff; position:absolute;'><p>made with <i class='fa fa-heart' style='color:orange; font-size: 14px;'></i> by lost (BETA VERSION)</p>");


// Custom CSS --------------------------------------------------------------------------------------------------------------------------------
(function() {var css = [
	"/* 	",
	"	version 4.0.0",
	"	für leitstellenspiel.de",
	"	copyright lost @ leitstellenspiel | http://lost.design",
	"*/",
	"html, body {",
	"   max-width: 100%;",
	"	overflow-x: hidden;",
	"	background-color: #f5f5f5;",
    "	font-family: Titillium Web !important;",
	"}",
	"",
	".mission_vehicle_state {",
	"	position: relative;",
	"	margin-top: -60px;",
	"	margin-left: -20px;",
	"	height: 30px !important;",
	"	width: 30px !important;",
	"}",
	"",
	".glyphicon {",
	"	font-size:11px;",
	"	line-height: 2;",
	"}",
	"",
	".missionSideBarEntry {",
	"	margin-bottom: 10px;",
	"	margin-top: 10px;",
	"	border: 10px;",
	"	border-color: #34495e;",
	"	border-bottom: solid;",
	"	background-color: #f5f5f5;",
	"	border-radius: 5px;",
	"}",
	"",
	".panel-heading, .panel, .panel-body {",
	"	border: none;",
	"	box-shadow: none;",
	"}",
	"",
	".panel-heading {",
	"	background-image:none !important;",
	"	/*background-color: #e74c3c !important;*/",
	"	color: #34495e;",
	"}",
	"",
	".panel{",
	"	background-image: none !important;",
	"	/*background-color: #bdc3c7 !important;*/",
	"	color: #2c3e50 !important;",
	"	border-radius: 10px;",
	"	border-top: solid;",
	"	border-bottom:solid;",
	"	border-color: #34495e !important;",
	"}",
	"",
	".missionSideBarEntry .panel-body {",
	"	background-color: #f5f5f5;",
	"}",
	"",
	".missionSideBarEntry .panel {",
	"	border-bottom: none !important;",
	"}",
	"",
	".map_position_mover { ",
	"	color: #2c3e50 !important;",
	"}",
	"",
	".navbar-default, .dropdown-menu {",
	"	background-image: none !important;",
	"	background-color: #e74c3c;",
	"	border-radius: 0;",
	"	border: 5px;;",
	"	border-bottom: solid;",
	"",
	"}",
	"",
	".btn, .progress, .alert {",
	"	background-image: none !important;",
	"	border: none;",
	"	border-radius: 5px;",
	"}",
	"",
	".progress-bar-striped, .progress-striped .progress-bar {",
	"	background-size: 20px 20px;",
	"	height: 15px;",
	"}",
	"",
	".progress {",
	"	background-color: #486683;",
	"	height: 15px;",
	"}",
	"",
	".small .progress {",
	"	height: 6px;",
	"}",
	"",
	"#map_outer {",
	"	margin-top: -20px;",
	"	width: 65%;",
    "   height:900px;",
	"}",
	"",
	".progress-bar-danger {",
	"	background-color: #e74c3c;",
	"}",
	"",
	".col-xs-11 {",
	"	width: 100% !important;",
	"	margin-top: -20px;",
	"	position: relative;",
	"}",
	"",
	"/* Einsatzliste länge */",
	"#missions-panel-body {",
	"	height: 800px !important;",
	"}",
	"",
	"#missions_outer {",
    "	width: 35%;",
    "	top: 100px;",
    "   right: 0;",
    "	position: absolute;",
	"}",
	".container-fluid {",
	"	padding: 0;",
	"}",
	"",
	"#map {",
	"	height: 900px;",
	"}",
	"",
	".well {",
	"	background-image:none;",
	"	border: none;",
	"	background-color: #fff;",
	"	box-shadow: none;",
	"}",
	"",
	".small {",
	"	width: 24% !important;",
	"	display: inline-block !important;",
	"	margin-right:4px; ",
	"}",
	"",
	"#chat_outer, #radio_outer, #buildings_outer {",
	"	top: 100px;",
    "	width: 35%;",
    "	margin-left: 66%;",
    "	position: absolute;",
	"}",
    "#settings_outer {",
	"	top: 100px;",
    "	width: 35%;",
    "	right: 0;",
    "	position: absolute;",
	"}",
	"",
	"#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #settings_outer .panel-heading {",
	"	background-color: #e74c3c;",
	"	color: #fff;",
	"}",
    "",
    "#chat_outer .panel-body, #radio_outer .panel-body, #buildings_outer .panel-body, #settings_outer .panel-body  {",
	"	max-height:820px !important;",
	"	height: 800px !important;",
    "   overflow: auto;",
	"}",
	"#radio_messages_important li {",
	"	background-color: #c0392b;",
	"	height: 27px;",
	"	border-radius: 5px;",
	"	color: #fff;",
	"	-webkit-animation-name: blink;",
	"	animation-name: blink;",
	"	-webkit-animation-iteration-count: infinite;",
	"	animation-iteration-count: infinite;",
	"	-webkit-animation-timing-function: cubic-bezier(1, 0, 0, 1);",
	"	animation-timing-function: cubic-bezier(1, 0, 0, 1);",
	"	-webkit-animation-duration: 1s;",
	"	animation-duration: 1s;",
	"	text-transform: uppercase;",
	"}",
	"",
	"#missions ul, #buildings ul, #mission_list_krankentransporte ul, #mission_list_krankentransporte ul, #radio ul, #alliance_chat ul {",
	"	padding-left: 10px !important;",
	"}",
	"",
	".building_list_fms {",
	"	border-radius: 10px;",
	"}",
	"",
	".building_list_fms_5 { ",
	"	border-radius: 5px;",
	"}",
	"",
	"#radio_messages .btn {",
	"	border: 2px;",
	"	background-color: #f5f5f5;",
	"}",
	"",
	"#radio_messages {",
	"	font-size: 13px;",
	"}",
	"",
	" #chat_outer li {",
	"	font-size: 13px;",
	"	line-height: 1.8;",
	"}",
	"",
    ".tab-content {",
    "    width: 95%;",
	"    margin: 0 auto;",
    "}",
    "",
    " #missions-aa, #funkl-aa, #chat-aa, #gebl-aa, #lss-setting {",
    "    font-weight: 600 !important;",
    "    font-size: 12px;",
	"}",
    "img[src*='/images/logo.de.png'] {",
    	"content:url('http://i.imgur.com/cPr2nKr.png');",
    "}",
    "#lost-menu {",
        "z-index:999;",
        "top: 60px;", 
        "right: 15px;", 
        "font-weight: 700 !important;", 
        "font-size:13px;",
        "text-transform: uppercase;",
        "position: absolute",
    "}"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
// Custom CSS Ende --------------------------------------------------------------------------------------------------------------------------------



// Tastatur Alarmierung --------------------------------------------------------------------------------------------------------------------------------
$("a:contains('Im Verband freigeben')").attr('id', 'freigabe-verband');
$("a:contains('Vorheriger Einsatz')").attr('id', 'vorheriger-einsatz');
$("a:contains('Nächster Einsatz')").attr('id', 'nächster-einsatz');
$("a:contains('Sprechwunsch bearbeiten')").attr('id', 'sprechwunsch-bearbeiten');
$("a:contains('Zurück zum Einsatz')").attr('id', 'zurück-einsatz');
$("a:contains('Anfahren')").attr('id', 'nächstes-krankenhaus');
$("a:contains('Rückalarmieren')").attr('id', 'lf-zurück');
$("small:contains('Fahrzeuge ausgeblendet.')").css('display', 'none');
$(".panel-heading:contains('Einsätze')").css('background-color', '#e74c3c').css("color","#fff");
//$("div[id^='mission_panel_heading']").css("background-color", "").css("color","#34495e");

$(document).keydown(function(e) {

    if (e.keyCode == 68) {
        // D nächster einsatz
        $("#nächster-einsatz")[0].click();

    } else if (e.keyCode == 87) {
        // W verband freigeben
        $("#freigabe-verband")[0].click();

    } else if (e.keyCode == 65) {
        // A vorheriger einsatz
        $("#vorheriger-einsatz")[0].click();

    } else if (e.keyCode == 83) {
        // S alarmieren und weiter
        $("#alert_next").click();

    } else if (e.keyCode == 81) {
        // Q Sprechwunsch
        $("#sprechwunsch-bearbeiten")[0].click();
     
    } else if (e.keyCode == 49) {
        // 1 1. krankenhaus
        $("#nächstes-krankenhaus")[0].click();

    } else if (e.keyCode == 50) {
        // 2 2. krankenhaus
        $("#nächstes-krankenhaus")[1].click();

    } else if (e.keyCode == 51) {
        // 3 3. krankenhaus
        $("#nächstes-krankenhaus")[2].click();

    } else if (e.keyCode == 52) {
        // 4 4. krankenhaus
        $("#nächstes-krankenhaus")[3].click();

    } else if (e.keyCode == 53) {
        // 5 5. krankenhaus
        $("#nächstes-krankenhaus")[4].click();

    } else if (e.keyCode == 82) {
        // R zurück zum Einsatz
        $("#zurück-einsatz")[0].click();

    } else if (e.keyCode == 69) {
        // E 1.fz zurück
        $("#lf-zurück")[0].click();
        
    } else if (e.keyCode == 88) {
        // X Alarmieren
        $("#mission_alarm_btn")[0].click();
        
    } else if (e.keyCode == 89) {
        // Y Erster Einsatz auf
        $("a[href^='/missions']")[0].click();
    }
    
    return e.returnValue;

});
// Tastatur Alarmierung Ende ----------------------------------------------------------------------------------------------------------------
//wichtiges : $("a[href^='/missions']")[0].click(); $("#lf-zurück")[0].click();

map.on('click', function(e) {
    alert(e.latlng); // e is an event object (MouseEvent in this case)
    map.updateSize();
});

// Design Funktionen ------------------------------------------------------------------------------------------------------------------------------------------------

$("#news_li").before('<div class="col-sm-4 overview_outer" id="settings_outer"><div id="settingsl“ class="sidebar-nav"><div class="panel panel-default"><div class="panel-heading">Einstellungen</div><div class="panel-body"><h4 style="line-height:0.5;">Design Farben</h4><a href="#" id="rot-design" style="background-color:#e74c3c;" class="btn btn-xs btn-info">Rot</a><a href="#" id="rtw-design" class="btn btn-xs btn-info">Gelb</a><a href="#" id="pol-design" class="btn btn-xs btn-info">Grün</a><a href="#" id="thw-design" class="btn btn-xs btn-info">Blau</a><a href="#" id="orange-design" class="btn btn-xs btn-info">Orange</a><a href="#" id="pink-design" class="btn btn-xs btn-info">Pink</a><a href="#" id="grau-design" class="btn btn-xs btn-info">Grau</a><a href="#" id="reset" class="btn btn-xs btn-danger">Zurücksetzen</a><br><br><h4 style="line-height:0.5;">Layout Einstellungen</h4><a href="#" id="map-switch" class="btn btn-xs btn-info"><i class="fa fa-toggle-on"></i> Map</a><a href="#" id="s-v4" class="btn btn-xs btn-info disabled">Version 4</a><a href="#" id="s-v5" class="btn btn-xs btn-info disabled" style="pointer-events: disabled;">Version 5</a><a href="#" id="s-v6" class="btn btn-xs btn-info disabled" style="pointer-events: disabled !important;">Version 6</a><a href="#" id="s-v7" class="btn btn-xs btn-info disabled" style="pointer-events: disabled;">Version 7</a><br><br><h4 style="line-height:0.5;">Tastatur Alarmierung</h4><kbd>Y</kbd> = 1. Einsatz in der Liste öffnen<br><kbd>W</kbd> = Im Verband freigeben <br><kbd>S</kbd> = Alarmieren & weiter<br><kbd>X</kbd> = Alarmieren<br><kbd>A</kbd> = Vorheriger Einsatz<br><kbd>D</kbd> = Nächster Einsatz<br><kbd>E</kbd> = 1. Fahrzeug vom Einsatz rückalarmieren<br><kbd>Q</kbd> = Sprechwunsch bearbeiten<br><kbd>R</kbd> = Zurück zum Einsatz<br><kbd>1 - 5</kbd> = 1. - 5. Krankenhaus anfahren<br><br><h4 style="line-height:0.5;">Geplante Features, bekannte Fehler & sonstiges</h4><ul><li>FEHLER: Karte lädt nicht vollständig</li><li>FEHLER: Krankenhaus übersicht</li><li>FEHLER: Patienten größe in Alarmmaske</li><li>GEPLANT: Fenster verschieben, verkleinern/vergrößern</li><li>GEPLANT: Speicherfunktion der Einstellungen</li><li>GEPLANT: Anzeige der FMS 5 in der neuen Leiste</li><li>GEPLANT: Mehr Layouts</li><li>GEPLANT: Schrift auswahl</li><li>GEPLANT: IconSwitcher</li><li>GEPLANT: Blinken der FMS 5 für Firefox</li><li>GEPLANT: Fehlerbehebungen</li><li>GEPLANT: Design Anpassungen</li><li>Optimiert für 1650 x 1050 & drüber</li><li>Auflösungen unter 1024 x .. können Fehler aufweisen</li></ul><br><p>Es handelt sich immer noch um eine Beta Version, ich bin für keine Schäden verantwortlich. <br><br>Das Script steht in keinem Bezug zum Leitstellenspiel.de - Abänderungen sind erlaubt, das veröffentlichen jedoch nicht.<p><a href="http://forum.leitstellenspiel.de/index.php/Thread/8077-REDESIGNS-by-lost/" style="font-size:12px; font-weight:600;"><p>made with <i class="fa fa-heart" style="color:red; font-size: 14px;"></i> by lost (BETA VERSION)</a><p style="font-size:8px;">Verband Feuerwehr München & Umgebung</p></p></div></div></div></div>');
$("#radio_outer").css("display", "none");
$("#buildings_outer").css("display", "none");
$("#chat_outer").css("display", "none");
$("#chat_outer").css("opacity", "0");
$("#buildings_outer").css("opacity", "0");
$("#radio_outer").css("opacity", "0");
$("#settings_outer").css("opacity", "0");

$('#map-switch').click(function(){
    $(this).find('i').toggleClass('fa-toggle-on fa-toggle-off')
});
// <li id="enable-map"><a href="#"><i class="fa fa-power-off"></i> Map</a></li><li id="map-fw"><a href="#">Map full</a></li>
// <a href="#" id="map-switch" class="btn btn-xs btn-info"><i class="fa fa-power-off"></i> Map</a>
//
$('#missions_outer').before('<div class="btn-group" id="lost-menu"><a href="#" class="btn btn-sm btn-default" id="missions-aa">Einsätze</a><a href="#" class="btn btn-sm btn-default" id="funkl-aa"">Funksprüche</a><a href="#" class="btn btn-sm btn-default" id="gebl-aa">Wachen</a><a href="#" class="btn btn-sm btn-default" id="chat-aa">Verbands Chat</a><a href="#" class="btn btn-sm btn-default" id="lss_setting" style="font-weight:600;">Einstellungen</a></div>');


$('#rot-design').click(function() {
    $(".navbar-default").css("background-color", "#e74c3c !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#e74c3c").css("color","#fff");
    $("div[id^='mission_panel_heading']").css("background-color", "").css("color","#34495e");
    $("#rtw-design").css("background-color","");
    $("#thw-design").css("background-color","");
    $("#pol-design").css("background-color","");
    $("#orange-design").css("background-color","");
    $("#pink-design").css("background-color","");
    $("#grau-design").css("background-color","");
    $("#rot-design").css("background-color","#e74c3c");
});

$('#rtw-design').click(function() {
    $(".navbar-default").css("background-color", "#F7CA18 !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#F7CA18");
    $("div[id^='mission_panel_heading']").css("background-color", "");
    $("#rtw-design").css("background-color","#e74c3c");
    $("#thw-design").css("background-color","");
    $("#pol-design").css("background-color","");
    $("#orange-design").css("background-color","");
    $("#pink-design").css("background-color","");
    $("#grau-design").css("background-color","");
    $("#rot-design").css("background-color","");
});

$('#pol-design').click(function() {
    $(".navbar-default").css("background-color", "#2ecc71 !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#F7CA18");
    $("div[id^='mission_panel_heading']").css("background-color", "");
    $("#rtw-design").css("background-color","");
    $("#pol-design").css("background-color","#e74c3c");
    $("#thw-design").css("background-color","0");
    $("#orange-design").css("background-color","");
    $("#pink-design").css("background-color","");
    $("#grau-design").css("background-color","");
    $("#rot-design").css("background-color","");
});

$('#thw-design').click(function() {
    $(".navbar-default").css("background-color", "#3498db !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#F7CA18");
    $("div[id^='mission_panel_heading']").css("background-color", "");
    $("#rtw-design").css("background-color","");
    $("#thw-design").css("background-color","#e74c3c");
    $("#pol-design").css("background-color","");
    $("#orange-design").css("background-color","");
    $("#pink-design").css("background-color","");
    $("#grau-design").css("background-color","");
    $("#rot-design").css("background-color","");
});

$('#orange-design').click(function() {
    $(".navbar-default").css("background-color", "#f39c12 !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#F7CA18");
    $("div[id^='mission_panel_heading']").css("background-color", "");
    $("#rtw-design").css("background-color","");
    $("#thw-design").css("background-color","");
    $("#pol-design").css("background-color","");
    $("#orange-design").css("background-color","#e74c3c");
    $("#pink-design").css("background-color","");
    $("#grau-design").css("background-color","");
    $("#rot-design").css("background-color","");
    
});

$('#pink-design').click(function() {
    $(".navbar-default").css("background-color", "#D2527F !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#F7CA18");
    $("div[id^='mission_panel_heading']").css("background-color", "");
    $("#rtw-design").css("background-color","");
    $("#thw-design").css("background-color","");
    $("#pol-design").css("background-color","");
    $("#orange-design").css("background-color","");
    $("#pink-design").css("background-color","#e74c3c");
    $("#grau-design").css("background-color","");
    $("#rot-design").css("background-color","");
});

$('#grau-design').click(function() {
    $(".navbar-default").css("background-color", "#6C7A89 !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#F7CA18");
    $("div[id^='mission_panel_heading']").css("background-color", "");
    $("#rtw-design").css("background-color","");
    $("#thw-design").css("background-color","");
    $("#pol-design").css("background-color","");
    $("#orange-design").css("background-color","");
    $("#pink-design").css("background-color","");
    $("#grau-design").css("background-color","#e74c3c");
    $("#rot-design").css("background-color","");
});

 
$('#missions-aa').click(function() {
    $("#buildings_outer").css("opacity", "0");
    $("#chat_outer").css("opacity", "0");
    $("#radio_outer").css("opacity", "0");
    $("#settings_outer").css("opacity", "0");
    
    $("#missions_outer").delay(0).animate({ opacity: 1 }, 600);
    $("#missions_outer").css("display", "");
    $("#radio_outer").css("display", "none");
    $("#buildings_outer").css("display", "none");
    $("#chat_outer").css("display", "none");
});

$('#chat-aa').click(function() {
    $("#missions_outer").css("opacity", "0");
    $("#buildings_outer").css("opacity", "0");
    $("#radio_outer").css("opacity", "0");
    $("#settings_outer").css("opacity", "0");
    
    $("#chat_outer").delay(0).animate({ opacity: 1 }, 600);
    $("#missions_outer").css("display", "none");
    $("#radio_outer").css("display", "none");
    $("#buildings_outer").css("display", "none");
    $("#chat_outer").css("display", "");
    $("#missions_outer").css("opacity", "0");
});

$('#gebl-aa').click(function() {
    $("#missions_outer").css("opacity", "0");
    $("#chat_outer").css("opacity", "0");
    $("#radio_outer").css("opacity", "0");
    $("#settings_outer").css("opacity", "0");
    
    $("#buildings_outer").delay(0).animate({ opacity: 1 }, 600);
    $("#missions_outer").css("display", "none");
    $("#radio_outer").css("display", "none");
    $("#buildings_outer").css("display", "");
    $("#chat_outer").css("display", "none");
    
    $("#missions_outer").css("opacity", "0");
});

$('#funkl-aa').click(function() {
    $("#missions_outer").css("opacity", "0");
    $("#buildings_outer").css("opacity", "0");
    $("#chat_outer").css("opacity", "0");
    $("#settings_outer").css("opacity", "0");
    
    $("#radio_outer").delay(0).animate({ opacity: 1 }, 600);
    $("#missions_outer").css("display", "none");
    $("#radio_outer").css("display", "");
    $("#buildings_outer").css("display", "none");
    $("#chat_outer").css("display", "none");
    


});

$('#lss_setting').click(function() {
    $("#missions_outer").css("opacity", "0");
    $("#buildings_outer").css("opacity", "0");
    $("#chat_outer").css("opacity", "0");
    $("#radio_outer").css("opacity", "0");
    
    $("#settings_outer").delay(0).animate({ opacity: 1 }, 600);
    $("#missions_outer").css("display", "none");
    $("#radio_outer").css("display", "none");
    $("#buildings_outer").css("display", "none");
    $("#chat_outer").css("display", "none");
    $("#settings_outer").css("display", "");
    
        $("#missions_outer").css("left", "");
        $("#missions_outer").css("width", "35%");
        
        $("#buildings_outer").css("margin-left", "66%");
        $("#buildings_outer").css("width", "35%");
        
        $("#chat_outer").css("margin-left", "66%");
        $("#chat_outer").css("width", "35%");

        $("#radio_outer").css("width", "35%");
});

$('#s-v4').click(function() {
    $("#buildings_outer").css("width:", "22% !important");
    $("#chat_outer").css("width:", "22% !important");
    $("#radio_outer").css("width:", "22% !important");
    $("#map").css("height", "500px !important");
    
    $("#buildings_outer").css("margin-top", "-400px");
    $("#missions_outer").css("margin-top", "-400px");
    $("#chat_outer").css("margin-top", "-400px");
    $("#radio_outer").css("margin-top", "-400px");
    
    $("#missions_outer").css("top", "0px");
    $("#buildings_outer").css("top", "0px");
    $("#chat_outer").css("top", "0px");
    $("#radio_outer").css("top", "0px");
    
    $("#chat_outer").css("margin-left", "0");
    $("#radio_outer").css("margin-left", "0");
    $("#buildings_outer").css("margin-left", "0");    


    $("#missions_outer").css("position", "relative");
    $("#radio_outer").css("position", "relative");
    $("#buildings_outer").css("position", "relative");
    $("#chat_outer").css("position", "relative");

    $("#missions_outer").css("display", "");
    $("#radio_outer").css("display", "");
    $("#buildings_outer").css("display", "");
    $("#chat_outer").css("display", "");
    
    $("#settings_outer").css("display", "none");
});

$('#s-v5').click(function() {
    $("#missions_outer").css("display", "none");
    $("#radio_outer").css("display", "none");
    $("#buildings_outer").css("display", "none");
    $("#chat_outer").css("display", "none");
    $("#settings_outer").css("display", "");
});

$('#s-v6').click(function() {
    $("#missions_outer").css("display", "none");
    $("#radio_outer").css("display", "none");
    $("#buildings_outer").css("display", "none");
    $("#chat_outer").css("display", "none");
    $("#settings_outer").css("display", "");
});

$('#reset').click(function() {
    location.reload();
});



var handlers = [
    // on first click:
    function() {
        $("#chat_outer").delay(0).animate({ opacity: 1 }, 600);
        $("#buildings_outer").delay(0).animate({ opacity: 1 }, 600);
        $("#missions_outer").delay(0).animate({ opacity: 1 }, 600);
        $("#radio_outer").delay(0).animate({ opacity: 1 }, 600);
        
        $("#map").css("display", "none");
        $("#missions_outer").css("left", "0");
        $("#missions_outer").css("right", "asdf");
        $("#missions_outer").css("width", "25%");
        $("#missions_outer").css("display", "");
        
        $("#buildings_outer").css("margin-left", "26%");
        $("#buildings_outer").css("right", "asdf");
        $("#buildings_outer").css("width", "25%");
        $("#buildings_outer").css("display", "");
        
        $("#chat_outer").css("margin-left", "51%");
        $("#chat_outer").css("right", "asdf");
        $("#chat_outer").css("width", "25%");
        $("#chat_outer").css("display", "");
        
        $("#radio_outer").css("width", "25%");
        $("#radio_outer").css("display", "");
        $("#radio_outer").css("right", "0");
        
        $("#settings_outer").css("display", "none");
        $("#map-switch").css("background-color","#e74c3c");     
    },

    // on second click:
    function() {
        $("#map").css("display", "");
        $("#map-switch").css("background-color","");


    }
];

var counter = 0;
$("#map-switch").click(function() {
    handlers[counter++].apply(this, Array.prototype.slice.apply(arguments));
    counter %= handlers.length;
});

//$(document).ready(function () {
//        $('.icon-unlock').click(function () {
//            $(this).addClass('icon-lock');
//            $(this).removeClass('icon-unlock'); 
//        }, function () {
//            $(this).addClass('icon-unlock');
//            $(this).removeClass('icon-lock');
//        });
// 	});




// Design Funktionen Ende ------------------------------------------------------------------------------------------------------------------------------------------------