// ==UserScript==
// @name         LSS Layout Manger
// @namespace    http://www.lss-manager.de
// @version      2.1
// @description  Mit der Tastatur Alarmieren oder sonstiges
// @author       lost & northdegree
// @include      http://www.leitstellenspiel.de/
// @include      http://www.leitstellenspiel.de/*
// @include      http://www.missionchief.com/*
// @include      http://www.missionchief.com
// @version      1
// @grant        none
// @run-at document-idle
// ==/UserScript==

var curwindow = "#missions_outer";
var nomap = false;
var vv4 = false;
var activem = false;
var markers = [];

//$('<audio id="alert-audio"><source src="https://a.clyp.it/xdjilqg4.mp3" type="audio/mpeg"></audio>').appendTo('body');

//$('body').after('<audio id="alert-audio"><source src="https://a.clyp.it/xdjilqg4.mp3" type="audio/mpeg"></audio>');

$('head')
    .append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">')
    .append('<link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet" type="text/css">');

$(".logo").after("</a><a href='http://forum.leitstellenspiel.de/index.php/Thread/8077-REDESIGNS-by-lost/' style='font-size:12px; font-weight:600; top:20px; left:15%; color:#fff; position:absolute;'><p>made with <i class='fa fa-heart' style='color:orange; font-size: 14px;'></i> by lost (BETA VERSION)</p>");
//$("#map_outer").removeAttr('style');

// Custom CSS --------------------------------------------------------------------------------------------------------------------------------
(function() {var css = [
	"/* 	",
	"	version 4.0.0",
	"	für leitstellenspiel.de",
	"	copyright lost @ leitstellenspiel | http://lost.design",
	"*/",
	"html, body {",
	"	overflow-x: hidden;",
	"   max-width: 100%;",
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
	"#missions-panel-body, #verband_einsatz {",
	"	height: 850px !important;",
	"}",
	"",
	"#missions_outer, #verband_outer, #chat_outer, #radio_outer, #buildings_outer, #settings_outer {",
    "	width: 35%;",
    "	top: 100px;",
    "   right: 0;",
    "	position: absolute;",
	"}",
	"#chat_outer, #verband_outer, #settings_outer, #radio_outer, #buildings_outer{",
	"	display: none;",
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
	"#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #verband-head, #settings_outer .panel-heading {",
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
	"#missions ul, #verband_einsatz ul, #buildings ul, #mission_list_krankentransporte ul, #mission_list_krankentransporte ul, #radio ul, #alliance_chat ul {",
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
    " #missions-aa, #verband-aa, #funkl-aa, #chat-aa, #wachen-aa, #lss-setting {",
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
    "}",
    ".onoffswitch {",
	"    position: relative; width: 30px;",
	"    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;",
	"}",
	".onoffswitch-checkbox {",
	"    display: none;",
	"}",
	".onoffswitch-label {",
	"    display: block; overflow: hidden; cursor: pointer;",
	"    height: 15px; padding: 0; line-height: 15px;",
	"    border: 2px solid #CCCCCC; border-radius: 15px;",
	"    background-color: #FFFFFF;",
	"    transition: background-color 0.3s ease-in;",
	"}",
	".onoffswitch-label:before {",
	"    content: \"\";",
	"    display: block; width: 15px; margin: 0px;",
	"    background: #FFFFFF;",
	"    position: absolute; top: 0; bottom: 0;",
	"    right: 13px;",
	"    border: 2px solid #CCCCCC; border-radius: 15px;",
	"    transition: all 0.3s ease-in 0s; ",
	"}",
	".onoffswitch-checkbox:checked + .onoffswitch-label {",
	"    background-color: #49E845;",
	"}",
	".onoffswitch-checkbox:checked + .onoffswitch-label, .onoffswitch-checkbox:checked + .onoffswitch-label:before {",
	"   border-color: #49E845;",
	"}",
	".onoffswitch-checkbox:checked + .onoffswitch-label:before {",
	"    right: 0px; ",
	"}",
	"#s_close {",
	"	float:right;",
	"	color: #ffffff;",
	"}",
	".leaflet-label {border: solid #34495e; border-radius: 10px; background-color: #f5f5f5;border-left: 5px; border-right:5px;}",
	".building_leaflet_text {font-size:16px;}"
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
    if (!($("input").is(":focus"))) {
        //alert('not focused');

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
            //$('#alert-audio')[0].play();
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
    }
});
// Tastatur Alarmierung Ende ----------------------------------------------------------------------------------------------------------------
//wichtiges : $("a[href^='/missions']")[0].click(); $("#lf-zurück")[0].click();


// Design Funktionen ------------------------------------------------------------------------------------------------------------------------------------------------
$("#news_li").before('<div class="col-sm-4 overview_outer" id="settings_outer"><div id="settingsl“ class="sidebar-nav"><div class="panel panel-default"><div class="panel-heading"><a href="#" id="s_close"><i class="fa fa-times-circle"></i></a>Einstellungen</div><div class="panel-body"><div class="col-md-12"><h4 style="line-height:0.5;">Map</h4><div class="col-md-4"><!--<a href="#" id="map_reload" style="background-color:#f5f5f5;color:black;" class="btn btn-sm btn-info">Karte neu laden<i class="fa fa-refresh"></i></a>-->Karte neu ausrichten<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="map_reload" unchecked><label class="onoffswitch-label" for="map_reload"></label></div></div><div class="col-md-4">Wachen-Planung<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="building_helper" unchecked><label class="onoffswitch-label" for="building_helper"></label></div></div><div class="col-md-4">10 km Radius<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="x_radius" unchecked><label class="onoffswitch-label" for="x_radius"></label></div></div></div><div class="col-md-12"><br><h4 style="line-height:0.5;">Markierungen</h4><div class="col-md-4"><!--<a href="#" id="map_reload" style="background-color:#f5f5f5;color:black;" class="btn btn-sm btn-info">Karte neu laden<i class="fa fa-refresh"></i></a>-->Feuerwehr<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_fw" checked><label class="onoffswitch-label" for="mark_fw"></label></div></div><div class="col-md-4">Polizei<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_pol" unchecked><label class="onoffswitch-label" for="mark_pol"></label></div></div><div class="col-md-4">Rettungsdienst<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_rw" unchecked><label class="onoffswitch-label" for="mark_rw"></label></div></div></div><div class="col-md-12"><div class="col-md-4"><!--<a href="#" id="map_reload" style="background-color:#f5f5f5;color:black;" class="btn btn-sm btn-info">Karte neu laden<i class="fa fa-refresh"></i></a>-->THW<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_thw" unchecked><label class="onoffswitch-label" for="mark_thw"></label></div></div><div class="col-md-4">Bundespolizei<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_bp" unchecked><label class="onoffswitch-label" for="mark_bp"></label></div></div><div class="col-md-4">Krankenhaus<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_kh" unchecked><label class="onoffswitch-label" for="mark_kh"></label></div></div></div><div class="col-md-12"><br><h4 style="line-height:0.5;">Design</h4><div class="btn-group" id="color-menu"><a href="#" class="btn btn-sm btn-default" id="rot-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#e74c3c;"></i> Rot</a><a href="#" class="btn btn-sm btn-default" id="rtw-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#F7CA18;"></i> Gelb</a><a href="#" class="btn btn-sm btn-default" id="pol-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#2ecc71;"></i> Grün</a><a href="#" class="btn btn-sm btn-default" id="thw-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#3498db;"></i> Blau</a><a href="#" class="btn btn-sm btn-default" id="orange-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#f39c12;"></i> Orange</a><a href="#" class="btn btn-sm btn-default" id="pink-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#D2527F;"></i> Pink</a><a href="#" class="btn btn-sm btn-default" id="grau-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#6C7A89;"></i> Grau</a> </div><br><br><div class="col-md-4">No Map Modus<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" unchecked><label class="onoffswitch-label" for="myonoffswitch"></label></div></div><div class="col-md-4">Version 4 <div class="onoffswitch disabled"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="s-v4" unchecked><label class="onoffswitch-label" for="s-v4"></label></div></div><div class="col-md-4">Version 5<div class="onoffswitch disabled"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="s-v5" unchecked><label class="onoffswitch-label" for="s-v5"></label></div></div></div><div class="col-md-12"><br><h4 style="line-height:0.5;">Tastatur Alarmierung</h4><div class="col-md-6"><kbd>Y</kbd> = 1. Einsatz in der Liste öffnen<br><kbd>W</kbd> = Im Verband freigeben <br><kbd>S</kbd> = Alarmieren & weiter<br><kbd>X</kbd> = Alarmieren<br><kbd>A</kbd> = Vorheriger Einsatz</div><div class="col-md-6"><kbd>D</kbd> = Nächster Einsatz<br><kbd>E</kbd> = 1. FZ vom Einsatz rückalarmieren<br><kbd>Q</kbd> = Sprechwunsch bearbeiten<br><kbd>R</kbd> = Zurück zum Einsatz<br><kbd>1 - 5</kbd> = 1. - 5. KH anfahren</div></div><p><br><br><br><br><!--<h4 style="line-height:0.5;">Geplante Features, bekannte Fehler & sonstiges</h4><ul><li>FEHLER: Krankenhaus übersicht</li><li>FEHLER: Patienten größe in Alarmmaske</li><li>GEPLANT: Speicherfunktion der Einstellungen</li><li>GEPLANT: Anzeige der FMS 5 in der neuen Leiste</li><li>GEPLANT: Mehr Layouts</li><li>GEPLANT: IconSwitcher</li><li>GEPLANT: Blinken der FMS 5 für Firefox</li><li>GEPLANT: Fehlerbehebungen</li><li>GEPLANT: Design Anpassungen</li></ul>--><br></p><p>Es handelt sich immer noch um eine Beta Version, ich bin für keine Schäden verantwortlich. <br><br>Das Script steht in keinem Bezug zum Leitstellenspiel.de - Abänderungen sind erlaubt, das veröffentlichen jedoch nicht.<p><a href="http://forum.leitstellenspiel.de/index.php/Thread/8077-REDESIGNS-by-lost/" style="font-size:12px; font-weight:600;"><p>made with <i class="fa fa-heart" style="color:red; font-size: 14px;"></i> by lost</a><a href="http://forum.leitstellenspiel.de/index.php/User/5627-Northdegree/" style="font-size:12px; font-weight:600; color:#e67e22;"> and some extra <i class="fa fa-heart" style="color:red; font-size: 14px;"></i> by Northdegree</a><p style="font-size:8px;">Verband Feuerwehr München & Umgebung</p></p></p></div></div></div>');
$("#news_li").before('<div class="col-sm-4 overview_outer" id="verband_outer"><div id="verband1" class="sidebar-nav"><div class="panel panel-default" id="verband_einsatz"><div class="panel-heading" id="verband-head">Verbands-Einsätze</div><div class="panel-body" id="missions-panel-body"></div></div></div></div>');
//Version 4 <div class="onoffswitch disabled"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="s-v4" unchecked><label class="onoffswitch-label" for="s-v4"></label></div>

// Verbandseinsätze in separaten tab ---------------------------------------------------------
$('#missions_outer').before('<div class="btn-group" id="lost-menu"><a href="#" class="btn btn-sm btn-default" id="missions-aa"><i id="missions-fire" class="fa fa-fire"></i> Einsätze</a><a href="#" class="btn btn-sm btn-default" id="verband-aa"><i class="fa fa-users"></i><i id="verbamd-fire" class="fa fa-fire"></i> Verband</a><a href="#" class="btn btn-sm btn-default" id="funkl-aa""><i id="radio-spin" class="fa fa-feed"></i> Funksprüche</a><a href="#" class="btn btn-sm btn-default" id="wachen-aa"><i id="buildings-spin" class="fa fa-building-o"></i> Wachen</a><a href="#" class="btn btn-sm btn-default" id="chat-aa"><i id="chat-spin" class="fa fa-comment-o"></i> Verbands Chat</a><a href="#" class="btn btn-sm btn-default" id="lss_setting" style="font-weight:600;"><i id="settings-spin" class="fa fa-cog"></i> Einstellungen</a></div>');
$('#mission_select_alliance').css("display","none");
$('#mission_list_alliance').detach().appendTo('#verband_einsatz #missions-panel-body');
// Verbandseinsätze in separaten tab ende ----------------------------------------------------

$('#map-switch').click(function(){
    $(this).find('i').toggleClass('fa-toggle-on fa-toggle-off')
});

$(function() {
    if(activem == true){
        for (var i = 0; i < 200; i++ ) {
            $("#missions-fire")
                .animate( { color: "#f39c12" }, 800 )
                .animate( { color: "#ea6153" }, 800 )
                .animate( { color: "#f1c40f" }, 800 );
        }
    } else {
        $("#missions-fire").stop(true);
    }
 });


$('#rot-design').click(function() {
	console.log(building_markers);
    $(".navbar-default").css("background-color", "#e74c3c !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #verband_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#e74c3c").css("color","#fff");
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
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #verband_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#F7CA18");
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
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #verband_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#2ecc71");
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
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #verband_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#3498db");
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
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #verband_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#f39c12");
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
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #verband_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#D2527F");
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
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #verband_outer .panel-heading, #settings_outer .panel-heading").css("background-color", "#6C7A89");
    $("div[id^='mission_panel_heading']").css("background-color", "");
    $("#rtw-design").css("background-color","");
    $("#thw-design").css("background-color","");
    $("#pol-design").css("background-color","");
    $("#orange-design").css("background-color","");
    $("#pink-design").css("background-color","");
    $("#grau-design").css("background-color","#e74c3c");
    $("#rot-design").css("background-color","");
});

$(function() {
    if(activem == true){
        for (var i = 0; i < 200; i++ ) {
            $("#missions-fire")
                .animate( { color: "#f39c12" }, 800 )
                .animate( { color: "#ea6153" }, 800 )
                .animate( { color: "#f1c40f" }, 800 );
        }
    } else {
        $("#missions-fire").stop(true);
    }
 });
 
$('#missions-aa').click(function() {
    activem = true;
	$('#settings-spin').removeClass('fa-spin');
	$(curwindow).fadeOut(500);
    $(curwindow).slideUp(1000);
	$('#missions_outer').fadeIn(500);
	$('#missions_outer').slideDown(1000);
	curwindow = '#missions_outer';
});

$('#verband-aa').click(function() {
	$('#settings-spin').removeClass('fa-spin');
	$(curwindow).fadeOut(500);
    $(curwindow).slideUp(1000);
	$('#verband_outer').fadeIn(500);
	$('#verband_outer').slideDown(1000);
	curwindow = '#verband_outer';
});

$('#chat-aa').click(function() {
	$('#settings-spin').removeClass('fa-spin');
	$(curwindow).fadeOut(500);
    $(curwindow).slideUp(1000);
	$('#chat_outer').fadeIn(500);
	$('#chat_outer').slideDown(1000);
	curwindow = '#chat_outer';
	activem = false;
});

$('#wachen-aa, #btn-alliance-new-mission').click(function() {    
	$('#settings-spin').removeClass('fa-spin');
	$(curwindow).fadeOut(500);
    $(curwindow).slideUp(1000);
	$('#buildings_outer').fadeIn(500);
	$('#buildings_outer').slideDown(1000);
	curwindow = '#buildings_outer';
	activem = false;
});

$('#funkl-aa').click(function() {
	$('#settings-spin').removeClass('fa-spin');
	$(curwindow).fadeOut(500);
    $(curwindow).slideUp(1000);
	$('#radio_outer').fadeIn(500);
	$('#radio_outer').slideDown(1000);
	curwindow = '#radio_outer';
	activem = false;
});

$('#lss_setting').click(function() {
    $('#settings-spin')
        .addClass('fa-spin')
        .css("z-index","999");
	$(curwindow).fadeOut(500);
    $(curwindow).slideUp(1000);
	$('#settings_outer').fadeIn(500);
	$('#settings_outer').slideDown(1000);
	curwindow = '#settings_outer';
	activem = false;
	
	if(!$('#building_helper').is(":checked"))
	{
		$('#missions_outer,#chat_outer,#buildings_outer,#radio_outer,#map_outer')
			.css("opacity","0.3")
			.css("filter","blur(7px)")
			.css("-webkit-filter","blur(7px)")
			.css("-moz-filter","blur(7px)")
			.css("-o-filter","blur(7px)")
			.css("-ms-filter","blur(7px)");
    }
    $("#missions-aa, #verband-aa, #wachen-aa, #chat-aa, #funkl-aa").addClass("disabled");
});

// Seite neuladen
$('#reset').click(function() {
    location.reload();
});

$("#s_close").click(function(){
	$('#settings_outer').fadeOut(500);
    $('#settings_outer').slideUp(1000);
    $('#settings_outer').css("z-index","999");
	// Blurr all other tabs when settings are open
		$('#missions_outer,#chat_outer,#buildings_outer,#radio_outer,#map_outer,#settings_outer')
		.css("opacity","1")
		.css("filter","")
		.css("-webkit-filter","")
		.css("-moz-filter","")
		.css("-o-filter","")
		.css("-ms-filter","");
    $("#missions-aa, #verband-aa, #wachen-aa, #chat-aa, #funkl-aa").removeClass("disabled");
    $('#settings-spin').removeClass('fa-spin');
    $('#missions_outer').css("display","");
    curwindow = '#missions_outer';
});

// Map Mode
var handlers = [
    // on first click:
    function() {
		nomap = true;
        $("#map").css("display", "none");
		$("#s_close").css("display", "block");
        $("#missions_outer")
            .removeAttr('style')
            .css("left", "0")
            .css("width", "25%")
            .css("display", "none")
			.fadeIn(500)
			.slideDown(1000);
        
        $("#buildings_outer")
            .removeAttr('style')            
            .css("left", "25%")
            .css("width", "25%")
            .css("display", "none")
			.fadeIn(500)
			.slideDown(1000);
        
        $("#chat_outer")
            .removeAttr('style')
            .css("left", "50%")
            .css("width", "25%")
            .css("display", "none")
			.fadeIn(500)
			.slideDown(1000);
        
        $("#radio_outer")
            .css("opacity", "1")
			.css("display", "none")
            .css("width", "25%")
            .css("right", "0")
            .css("margin-top","")
			.fadeIn(500)
			.slideDown(1000);
        
        $("#settings_outer")
            .css("display","none")
            .css("z-index","999");
          
        $("#missions-aa, #verband-aa, #wachen-aa, #chat-aa, #funkl-aa").addClass("disabled");
        
        $('#missions_outer,#chat_outer,#buildings_outer,#radio_outer,#map_outer')
		.css("opacity","1")
		.css("filter","")
		.css("-webkit-filter","")
		.css("-moz-filter","")
		.css("-o-filter","")
		.css("-ms-filter","");
        
        $('#settings-spin').removeClass('fa-spin');

    },

    // on second click:
    function() {
		nomap = false;
		$("#missions_outer,#buildings_outer,#chat_outer,#radio_outer").removeAttr("style");
		$("#missions_outer,#buildings_outer,#chat_outer,#radio_outer")
			.css("display", "none")
			.css("width", "35%")
			.css("top", "100px")
			.css("right", "0")
			.css("position", "absolute");
        $("#map").css("display", "");
        $("#map-switch").css("background-color","");
        $("#missions-aa, #verband-aa, #wachen-aa, #chat-aa, #funkl-aa").addClass("disabled");
        $("#settings_outer")
            .css("z-index","");       
    }
];

var counter = 0;
$("#myonoffswitch").click(function() {
    handlers[counter++].apply(this, Array.prototype.slice.apply(arguments));
    counter %= handlers.length;
});

// Version 4
var swv4 = [
    // on first click:
    function() {
		vv4 = true;
		$("#s_close").css("display", "block");
        $("#map").css("height","550px");
        
        $("#missions_outer").css("display","");
        $("#missions-panel-body").css("height","1320px");
        $("footer").css("display","none");
        
        
        $("#buildings_outer")
            .removeAttr('style')            
            .css("left", "-10px")
            .css("right", "asdf")
            .css("width", "23%")
            .css("display", "")
            .css("top", "asdf")
            .css("margin-top", "520px")
			.fadeIn(500)
			.slideDown(1000);
        
        $("#chat_outer")
            .removeAttr('style')
            .css("left", "21.5%")
            .css("right", "asdf")
            .css("width", "23%")
            .css("display", "none")
            .css("top", "asdf")
            .css("margin-top", "520px")
			.fadeIn(500)
			.slideDown(1000);
        
        $("#radio_outer")
            .css("opacity", "1")
			.css("display", "none")
            .css("width", "22%")
            .css("right", "34.5%")
            .css("left", "asdf")
            .css("top", "asdf")
            .css("margin-top", "520px")
			.fadeIn(500)
			.slideDown(1000);
        
        $("#settings_outer")
            .css("display","")
            .css("z-index","999")
            .fadeOut(500)
			//.slideDown(1000)
        ;
          
        $("#missions-aa, #verband-aa, #wachen-aa, #chat-aa, #funkl-aa").addClass("disabled");
        
        $('#missions_outer,#chat_outer,#buildings_outer,#radio_outer,#map_outer')
		.css("opacity","1")
		.css("filter","")
		.css("-webkit-filter","")
		.css("-moz-filter","")
		.css("-o-filter","")
		.css("-ms-filter","");
        
        $('#settings-spin').removeClass('fa-spin');

    },

    // on second click:
    function() {
		vv4 = false;
		$("#missions_outer,#buildings_outer,#chat_outer,#radio_outer").removeAttr("style");
		$("#missions_outer,#buildings_outer,#chat_outer,#radio_outer")
			.css("display", "none")
			.css("width", "35%")
			.css("top", "100px")
			.css("right", "0")
			.css("position", "absolute");
		
        $("#map").css("height", "900px");
        $("#map-switch").css("background-color","");
        $("#missions-aa, #verband-aa, #wachen-aa, #chat-aa, #funkl-aa").addClass("disabled");
        $("#settings_outer")
            .css("z-index","");       
        $("#missions-panel-body").css("height","800px");
    }
];

var counterv4 = 0;
$("#s-v4").click(function() {
    swv4[counterv4++].apply(this, Array.prototype.slice.apply(arguments));
    counterv4 %= swv4.length;
});
// Map reload
$('#map_reload').click(function() {
	setTimeout(function() {
		$('#map_reload').attr("checked",false);
		map.invalidateSize(true);
	}, 300);
});
// Wachen-Planung -------------------------------------------

function drawCircles(radius){
	$.each( markers, function( key, value ) {
		map.removeLayer(value);
	});
	markers = [];
	var data = [];
	$('#building_list').find('.building_list_li').each(function(index, element) {
		var stationId = $(element).find('.building_list_caption').find('.building_marker_image').attr('building_id'),
			stationName = $(element).find('.building_list_caption').find('.map_position_mover').html(),
			stationLat = $(element).find('.building_list_caption').find('.map_position_mover').attr('data-latitude'),
			stationLng = $(element).find('.building_list_caption').find('.map_position_mover').attr('data-longitude'),
			stationType = $(element).attr('building_type_id'),
			cars = [];
			
		$('#vehicle_building_'+ stationId).find('li').each(function(index, element) {
			var carId = $(element).attr('vehicle_id'),
				carName = $(element).find('a').html(),
				carType = $(element).find('a').attr('vehicle_type_id')
				carFMS = $(element).find(".building_list_fms").html();
			var tempCarData = {
				'carId' : carId,
				'carName' : carName,
				'carType' : carType,
				'carFMS' : $(element).find(".building_list_fms").html()
			};

			cars.push(tempCarData);
		});

		var tempStationData = {
			'stationId' : stationId,
			'stationName' : stationName,
			'stationLat' : stationLat,
			'stationLng' : stationLng,
			'stationType' : stationType,
			'cars': cars
		};

		data.push(tempStationData);
	});
	map.attributionControl.addAttribution("Wachen-Planung by Lost &amp; Northdegree");
	// Map refresh
	map.invalidateSize(true);
	// Add markers for all buildings
	$.each( data, function( key, value ) {
		col = 'red'
		draw = false
		if(value['stationType']==0 && $('#mark_fw').is(":checked")){
			draw = true
		}else if(value['stationType']==6 && $('#mark_pol').is(":checked")){
			draw = true
			col='green'
		}else if(value['stationType']==2 && $('#mark_rw').is(":checked")){
			draw = true
			col='orange'
		}else if(value['stationType']==9 && $('#mark_thw').is(":checked")){
			draw = true
			col='darkblue'
		}else if(value['stationType']==11 && $('#mark_bp').is(":checked")){
			draw = true
			col='lightblue'
		}else if(value['stationType']==4 && $('#mark_kh').is(":checked")){
			draw = true
			col='black'
		}
		if(draw==true){
			cars = "<span class='building_leaflet_text' style='color: "+col+";'><i class='fa fa-building'></i> "+value['stationName']+"</span><br>";
			$.each( value['cars'], function( key, value ) {
				cars += "&nbsp;&nbsp;&nbsp;&nbsp;<span class='building_list_fms building_list_fms_"+value['carFMS']+"'>&nbsp;"+value['carFMS']+"&nbsp;</span>&nbsp;"+value['carName']+"<br>";
			});
			var circle = L.circle([value['stationLat'],value['stationLng']], radius, {
				color: col,
				fillOpacity: 0.3
			}).addTo(map);
			circle.bindLabel(cars);
			markers.push(circle);
		}
	});
}

$('#x_radius,#mark_kh,#mark_bp,#mark_thw,#mark_rw,#mark_pol,#mark_fw').click(function() {
	if($('#building_helper').is(":checked"))
	{
		if(!$('#x_radius').is(":checked")){
			drawCircles(5000);
		}else{
			drawCircles(10000);
		}
	}
});

var helper = [
    // on first click:
    function() {
		$('#map_outer')
			.css("opacity","1")
			.css("filter","blur(0px)")
			.css("-webkit-filter","blur(0px)")
			.css("-moz-filter","blur(0px)")
			.css("-o-filter","blur(0px)")
			.css("-ms-filter","blur(0px)");
		if(!$('#x_radius').is(":checked")){
			drawCircles(5000);
		}else{
			drawCircles(10000);
		}
    },

    // on second click:
    function() {
		$('#map_outer')
			.css("opacity","0.3")
			.css("filter","blur(7px)")
			.css("-webkit-filter","blur(7px)")
			.css("-moz-filter","blur(7px)")
			.css("-o-filter","blur(7px)")
			.css("-ms-filter","blur(7px)");
		$.each( markers, function( key, value ) {
			map.removeLayer(value);
		});
		markers = [];
		map.attributionControl.removeAttribution("Wachen-Planung by Lost &amp; Northdegree");
    }
];

var counterhelper = 0;
$("#building_helper").click(function() {
    helper[counterhelper++].apply(this, Array.prototype.slice.apply(arguments));
    counterhelper %= helper.length;
});

function building_maps_draw(e){
	adddata = "<br>"
	$('#vehicle_building_'+ e.id).find('li').each(function(index, element) {
	var carId = $(element).attr('vehicle_id'),
		carName = $(element).find('a').html(),
		carType = $(element).find('a').attr('vehicle_type_id')
		carFMS = $(element).find(".building_list_fms").html();
	adddata+= "<span class='building_list_fms building_list_fms_"+carFMS+"'>"+carFMS+"</span> "+carName+"<br>"
	var tempCarData = {
		'carId' : carId,
		'carName' : carName,
		'carType' : carType,
		'carFMS' : $(element).find(".building_list_fms").html()
	};
	});
	var t=L.marker([e.latitude,e.longitude],{icon:icon_empty}).bindLabel(e.name+adddata).addTo(map)
	t.building_id=e.id,"undefined"!=typeof e.opacity&&t.setOpacity(e.opacity),iconMapGenerate(e.building_marker_image,t),t.on("click",function(){lightboxOpen("/buildings/"+e.id)}),building_markers.push(t)
}
/*building_markers*/
$.each( building_markers, function( key, value ) {
	adddata = "<br>"
	$('#vehicle_building_'+ value.building_id).find('li').each(function(index, element) {
	var carId = $(element).attr('vehicle_id'),
		carName = $(element).find('a').html(),
		carType = $(element).find('a').attr('vehicle_type_id')
		carFMS = $(element).find(".building_list_fms").html();
	adddata+= "<span class='building_list_fms building_list_fms_"+carFMS+"'>"+carFMS+"</span> "+carName+"<br>"
	var tempCarData = {
		'carId' : carId,
		'carName' : carName,
		'carType' : carType,
		'carFMS' : $(element).find(".building_list_fms").html()
	};
	});
	value.bindLabel(value.label._content+adddata)
});
building_maps_redraw();
// Design Funktionen Ende ------------------------------------------------------------------------------------------------------------------------------------------------