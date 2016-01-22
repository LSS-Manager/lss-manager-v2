// ==UserScript==
// @name         LSS Layout Manger
// @namespace    http://www.lss-manager.de
// @version      2.3
// @description  Mit der Tastatur Alarmieren oder sonstiges
// @author       lost & northdegree
// @include      http://www.leitstellenspiel.de/
// @include      http://www.leitstellenspiel.de/*
// @include      http://www.missionchief.com/*
// @include      http://www.missionchief.com/
// @version      1
// @grant        none
// @run-at idle
// ==/UserScript==

var curwindow = "#missions_outer",
    nomap = false,
    vv4 = false,
    markers = [],
    mapfix = false,
    nofms = false,
    newmessages = 0,
    buildingsById = {
        0: 'Feuerwache',
        1: 'Feuerwehrschule',
        2: 'Rettungswache',
        3: 'Rettungsschule',
        4: 'Krankenhaus',
        5: 'Rettungshubschrauber-Station',
        6: 'Polizeiwache',
        7: 'Leitstelle',
        8: 'Polizeischule',
        9: 'THW',
        10: 'THW Schule',
        11: 'Bereitschaftspolizei'
    };

//$('<audio id="alert-audio"><source src="https://a.clyp.it/xdjilqg4.mp3" type="audio/mpeg"></audio>').appendTo('body');

//$('body').after('<audio id="alert-audio"><source src="https://a.clyp.it/xdjilqg4.mp3" type="audio/mpeg"></audio>');

$('head')
    .append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">')
    .append('<link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet" type="text/css">')
    .append('<link rel="stylesheet" href="http://lss.lost.design/lss-manager.css">');

$("a[class^='navbar-brand hidden-xs']").append("<a href='http://forum.leitstellenspiel.de/index.php/Thread/8077-REDESIGNS-by-lost/'><img src='http://i.imgur.com/cPr2nKr.png' style='width:250px; top: 10px;left: 0; position: absolute !important;'></a>");
//$("#map_outer").removeAttr('style');


// Tastatur Alarmierung --------------------------------------------------------------------------------------------------------------------------------
$("a:contains('Im Verband freigeben')").attr('id', 'freigabe-verband');
$("a:contains('Vorheriger Einsatz')").attr('id', 'vorheriger-einsatz');
$("a:contains('Nächster Einsatz')").attr('id', 'naechster-einsatz');
$("a:contains('Sprechwunsch bearbeiten')").attr('id', 'sprechwunsch-bearbeiten');
$("a:contains('Zurück zum Einsatz')").attr('id', 'zurueck-einsatz');
$("a:contains('Anfahren')").attr('class', 'naechstes-krankenhaus');
$("a:contains('Rückalarmieren')").attr('id', 'lf-zurueck');
$("small:contains('Fahrzeuge ausgeblendet.')").css('display', 'none');
$(".panel-heading:contains('Einsätze')").css('background-color', '#e74c3c').css("color", "#fff");
//$("div[id^='mission_panel_heading']").css("background-color", "").css("color","#34495e");
$("li[id^='patient_']").attr('id', 'pat_pro');
$("div[id^='mission_patients_']").addClass('patient_progress');
$("div[class^='visible-xs']").before('<br>');
$(".logo").css('display', 'none');


$(document).keydown(function (e) {
    if (!($("input").is(":focus"))) {
        switch (e.keyCode) {
        case 68:
            $("#naechster-einsatz").click();
            break;
        case 87:
            $("#freigabe-verband").click();
            break;
        case 65:
            $("#vorheriger-einsatz").click();
            break;
        case 83:
            $("#alert_next").click();
            break;
        case 81:
            $("#sprechwunsch-bearbeiten").click();
            break;
        case 49:
            $(".naechstes-krankenhaus:eq(0)").click();
            break;
        case 50:
            $(".naechstes-krankenhaus:eq(1)").click();
            break;
        case 51:
            $(".naechstes-krankenhaus:eq(2)").click();
            break;
        case 52:
            $(".naechstes-krankenhaus:eq(3)").click();
            break;
        case 53:
            $(".naechstes-krankenhaus:eq(4)").click();
            break;
        case 82:
            $("#zurueck-einsatz").click();
            break;
        case 69:
            $("#lf-zurück").click();
            break;
        case 88:
            $("#mission_alarm_btn").click();
            break;
        case 89:
            $("#mission_list").find("a[href^='/missions/']:eq(0)").click();
            break;
        }
        return e.returnValue;
    }
});
// Tastatur Alarmierung Ende ----------------------------------------------------------------------------------------------------------------
//wichtiges : $("a[href^='/missions']")[0].click(); $("#lf-zurück")[0].click();


// Design Funktionen ------------------------------------------------------------------------------------------------------------------------------------------------
$("#news_li")
    .before('<div class="col-sm-4 overview_outer" id="settings_outer"><div id="settings1“ class="sidebar-nav"><div class="panel panel-default"><div class="panel-heading"><a href="#" id="s_close"><i class="fa fa-times-circle"></i></a>Einstellungen</div><div class="panel-body"><div class="col-md-12"><h4 style="line-height:0.5;">Leitstellenspiel</h4><div class="col-md-4">FMS5 Verbandsmitglieder<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="sw_verband" checked><label class="onoffswitch-label" for="sw_verband"></label></div></div></div><div class="col-md-12"><br><h4 style="line-height:0.5;">Map</h4><div class="col-md-4"><!--<a href="#" id="map_reload" style="background-color:#f5f5f5;color:black;" class="btn btn-sm btn-info">Karte neu laden<i class="fa fa-refresh"></i></a>-->Karte neu ausrichten<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="map_reload" unchecked><label class="onoffswitch-label" for="map_reload"></label></div></div><div class="col-md-4">Wachen-Planung<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="building_helper" unchecked><label class="onoffswitch-label" for="building_helper"></label></div></div><div class="col-md-4">10 km Radius<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="x_radius" unchecked><label class="onoffswitch-label" for="x_radius"></label></div></div></div><div class="col-md-12"><br><h4 style="line-height:0.5;">Markierungen</h4><div class="col-md-4"><!--<a href="#" id="map_reload" style="background-color:#f5f5f5;color:black;" class="btn btn-sm btn-info">Karte neu laden<i class="fa fa-refresh"></i></a>-->Feuerwehr<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_fw" checked><label class="onoffswitch-label" for="mark_fw"></label></div></div><div class="col-md-4">Polizei<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_pol" unchecked><label class="onoffswitch-label" for="mark_pol"></label></div></div><div class="col-md-4">Rettungsdienst<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_rw" unchecked><label class="onoffswitch-label" for="mark_rw"></label></div></div></div><div class="col-md-12"><div class="col-md-4"><!--<a href="#" id="map_reload" style="background-color:#f5f5f5;color:black;" class="btn btn-sm btn-info">Karte neu laden<i class="fa fa-refresh"></i></a>-->THW<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_thw" unchecked><label class="onoffswitch-label" for="mark_thw"></label></div></div><div class="col-md-4">Bereitschaftspolizei<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_bp" unchecked><label class="onoffswitch-label" for="mark_bp"></label></div></div><div class="col-md-4">Krankenhaus<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mark_kh" unchecked><label class="onoffswitch-label" for="mark_kh"></label></div></div></div><div class="col-md-12"><br><h4 style="line-height:0.5;">Design</h4><div class="btn-group" id="color-menu"><a href="#" class="btn btn-sm btn-default" id="rot-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#e74c3c;"></i> Rot</a><a href="#" class="btn btn-sm btn-default" id="rtw-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#F7CA18;"></i> Gelb</a><a href="#" class="btn btn-sm btn-default" id="pol-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#2ecc71;"></i> Grün</a><a href="#" class="btn btn-sm btn-default" id="thw-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#3498db;"></i> Blau</a><a href="#" class="btn btn-sm btn-default" id="orange-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#f39c12;"></i> Orange</a><a href="#" class="btn btn-sm btn-default" id="pink-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#D2527F;"></i> Pink</a><a href="#" class="btn btn-sm btn-default" id="grau-design" style="background-color: transparent;"><i class="fa fa-circle" style="color:#6C7A89;"></i> Grau</a> </div><br><br><div class="col-md-4">No Map Modus<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" unchecked><label class="onoffswitch-label" for="myonoffswitch"></label></div></div><div class="col-md-4">Version 4 <div class="onoffswitch disabled"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="s-v4" unchecked><label class="onoffswitch-label" for="s-v4"></label></div></div><div class="col-md-4">Version 5<div class="onoffswitch disabled"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="s-v5" unchecked><label class="onoffswitch-label" for="s-v5"></label></div></div></div><div class="col-md-12"><br><br><h4 style="line-height:0.5;">Tastatur Alarmierung</h4><div class="col-md-6"><kbd>Y</kbd> = 1. Einsatz in der Liste öffnen<br><kbd>W</kbd> = Im Verband freigeben <br><kbd>S</kbd> = Alarmieren & weiter<br><kbd>X</kbd> = Alarmieren<br><kbd>A</kbd> = Vorheriger Einsatz</div><div class="col-md-6"><kbd>D</kbd> = Nächster Einsatz<br><kbd>E</kbd> = 1. FZ vom Einsatz rückalarmieren<br><kbd>Q</kbd> = Sprechwunsch bearbeiten<br><kbd>R</kbd> = Zurück zum Einsatz<br><kbd>1 - 5</kbd> = 1. - 5. KH anfahren</div></div><p><br><br><br><br><!--<h4 style="line-height:0.5;">Geplante Features, bekannte Fehler & sonstiges</h4><ul><li>FEHLER: Krankenhaus übersicht</li><li>FEHLER: Patienten gröÃƒÅ¸e in Alarmmaske</li><li>GEPLANT: Speicherfunktion der Einstellungen</li><li>GEPLANT: Anzeige der FMS 5 in der neuen Leiste</li><li>GEPLANT: Mehr Layouts</li><li>GEPLANT: IconSwitcher</li><li>GEPLANT: Blinken der FMS 5 für Firefox</li><li>GEPLANT: Fehlerbehebungen</li><li>GEPLANT: Design Anpassungen</li></ul>--><br><br><br></p><p style="margin-top:20px;">Es handelt sich immer noch um eine Beta Version, ich bin für keine Schäden verantwortlich. <br><br>Das Script steht in keinem Bezug zum Leitstellenspiel.de - Abänderungen sind erlaubt, das veröffentlichen jedoch nicht.<p><a href="http://forum.leitstellenspiel.de/index.php/Thread/8077-REDESIGNS-by-lost/" style="font-size:12px; font-weight:600;"><p>made with <i class="fa fa-heart" style="color:red; font-size: 14px;"></i> by lost</a><a href="http://forum.leitstellenspiel.de/index.php/User/5627-Northdegree/" style="font-size:12px; font-weight:600; color:#e67e22;"> and some extra <i class="fa fa-heart" style="color:red; font-size: 14px;"></i> by Northdegree</a><p style="font-size:8px;">Verband Feuerwehr München & Umgebung</p></p></p></div></div></div>')
    .before('<div class="col-sm-4 overview_outer" id="verband_outer"><div id="verband1" class="sidebar-nav"><div class="panel panel-default" id="verband_einsatz"><div class="panel-heading" id="verband-head">Verbands-Einsätze</div><div class="panel-body" id="missions-panel-body"></div></div></div></div>');
//Version 4 <div class="onoffswitch disabled"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="s-v4" unchecked><label class="onoffswitch-label" for="s-v4"></label></div>
// Verbandseinsätze in separaten tab ---------------------------------------------------------
$('#missions_outer').before('<div class="btn-group-vertical" id="lost-menu"><a href="#" class="btn btn-sm btn-default" id="missions-aa" data-toggle="tooltip" data-placement="left" title="Einsätze"><i id="missions-fire" class="fa fa-fire"></i></a><a href="#" class="btn btn-sm btn-default" id="verband-aa" data-toggle="tooltip" data-placement="left" title="Verband"><i class="fa fa-fire"></i></a><a href="#" class="btn btn-sm btn-default" id="radio-aa" data-toggle="tooltip" data-placement="left" title="Funksprüche"><i id="radio-spin" class="fa fa-feed"></i></a><a href="#" class="btn btn-sm btn-default" id="buildings-aa" data-toggle="tooltip" data-placement="left" title="Wachen"><i id="buildings-spin" class="fa fa-building-o"></i></a><a href="#" class="btn btn-sm btn-default" id="chat-aa" data-toggle="tooltip" data-placement="left" title="Chat"><i id="chat-spin" class="fa fa-comment-o"></i></a><a href="#" class="btn btn-sm btn-default" id="settings-aa" style="font-weight:600; font-size:25px;" data-toggle="tooltip" data-placement="left" title="Einstellungen"><i id="settings-spin" class="fa fa-cog"></i></a></div>');
$('#missions-aa, #verband-aa, #radio-aa, #buildings-aa, #settings-aa, #chat-aa').tooltip();
$('#mission_select_alliance').css("display", "none");
$('#mission_list_alliance').detach().appendTo('#verband_einsatz #missions-panel-body');
// Verbandseinsätze in separaten tab ende ----------------------------------------------------

// Anzeigen von offenen Sprechwünschen & Chatnachrichten
function check_Messages(){
    var fms5=($("#radio_messages_important [class^='radio_message_vehicle']").length)-($("#radio_messages_important [class^='radio_message_vehicle']:contains('Verband')").length);
    $("#radio-aa #radio-spin").html(((fms5>0)?'<span class="building_list_fms building_list_fms_4" style="position:absolute;top:0px;right:0px;font-size:8pt;">'+fms5+'</span>':''));
    $("#chat-aa #chat-spin").html(((newmessages>0)?'<span class="building_list_fms building_list_fms_4" style="position:absolute;top:0px;right:0px;font-size:8pt;">'+newmessages+'</span>':''));
}
setInterval(check_Messages, 3000);

// Anzeigen von offenen Sprechwünschen & Chatnachrichten ende

$('#map-switch').click(function () {
    $(this).find('i').toggleClass('fa-toggle-on fa-toggle-off');
});

function loop() {
    $("#missions-fire")
        .animate({color: "#f39c12"}, 800)
        .animate({color: "#ea6153"}, 800)
        .animate({color: "#f1c40f"}, 800, loop);
}
$(loop);


$('[id$=-design]').click(function () {
    var background,
        design = $(this).attr('id');
    switch (design) {
    case 'rtw-design':
        background = "#F7CA18";
        break;
    case 'pol-design':
        background = "#2ecc71";
        break;
    case 'thw-design':
        background = '#3498db';
        break;
    case 'orange-design':
        background = "#f39c12";
        break;
    case 'pink-design':
        background = "#D2527F";
        break;
    case 'grau-design':
        background = "#6C7A89";
        break;
    default:
        background = "#e74c3c";
        break;
    }
    $(".navbar-default").css("background-color", background + " !important");
    $("#chat_outer .panel-heading, #radio_outer .panel-heading, #buildings_outer .panel-heading, #missions_outer .panel-heading, #verband_outer .panel-heading, #settings_outer .panel-heading").css("background-color", background).css("color", "#fff");
    $("div[id^='mission_panel_heading']")
        .css("background-color", "")
        .css("color", "#34495e");
});

function changePage(tab) {
    var page = "#" + tab;
    page = page.replace("btn-alliance-new-mission", "buildings_outer");
    page = page.replace("-aa", "_outer");
    if(page=="#chat_outer"){
        newmessages=0;
    }
    if ($(page)[0]) {
        if (page == "#settings_outer") {
            $('#settings-spin').addClass('fa-spin').css("z-index", "999");
            if (!$('#building_helper').is(":checked")) {
                $('#missions_outer,#chat_outer,#buildings_outer,#radio_outer,#map_outer').css("opacity", "0.3").css("filter", "blur(7px)").css("-webkit-filter", "blur(7px)").css("-moz-filter", "blur(7px)").css("-o-filter", "blur(7px)").css("-ms-filter", "blur(7px)");
            }
            $("#missions-aa, #verband-aa, #buildings-aa, #chat-aa, #radio-aa").addClass("disabled");
        } else {
            $('#settings-spin').removeClass('fa-spin');
        }
        $(curwindow).fadeOut(500);
        $(curwindow).slideUp(1000);
        $(page).fadeIn(500);
        $(page).slideDown(1000);
        curwindow = page;
    } else {
        window.alert("Could not find page \"" + page + "\".\r\nReport to us immediately!");
    }
}

/* Tab wechseln */
$('[id$=-aa],#btn-alliance-new-mission').click(function () {
    changePage($(this).attr('id'));
});

// Seite neuladen
$('#reset').click(function () {
    window.location.reload();
});

$("#s_close").click(function () {
    $('#missions_outer').css("display", "");
    changePage("missions_outer");
    $('#settings_outer').css("z-index", "999");
    $('#missions_outer,#chat_outer,#buildings_outer,#radio_outer,#map_outer,#settings_outer')
        .css("opacity", "1")
        .css("filter", "")
        .css("-webkit-filter", "")
        .css("-moz-filter", "")
        .css("-o-filter", "")
        .css("-ms-filter", "");
    $("#missions-aa, #verband-aa, #buildings-aa, #chat-aa, #radio-aa").removeClass("disabled");
    $('#settings-spin').removeClass('fa-spin');
});

//  Map neu ausrichten bei klick
if (map != "undefined") {
    map.on('mousedown', function () {
        if (!mapfix) {
            map.invalidateSize(true);
            mapfix = true;
        }
    });
}

// Alle Wachen
function get_buildings() {
    var data = [];
    $('#building_list').find('.building_list_li').each(function (index, element) {
        var stationId = $(element).find('.building_list_caption').find('.building_marker_image').attr('building_id'),
            stationName = $(element).find('.building_list_caption').find('.map_position_mover').html(),
            stationLat = $(element).find('.building_list_caption').find('.map_position_mover').attr('data-latitude'),
            stationLng = $(element).find('.building_list_caption').find('.map_position_mover').attr('data-longitude'),
            stationType = $(element).attr('building_type_id'),
            tempStationData = {
                'stationId': stationId,
                'stationName': stationName,
                'stationLat': stationLat,
                'stationLng': stationLng,
                'stationType': stationType
            };

        data.push(tempStationData);
    });
    return data;
}

// Alle Fahrzeuge einer Wache
function car_list(building) {
    var data = [];
    $('#vehicle_building_' + building).find('li').each(function (index, element) {
        data.push({
            "id": $(element).attr('vehicle_id'),
            "name": $(element).find('a').html(),
            "type": $(element).find('a').attr('vehicle_type_id'),
            "fms": $(element).find(".building_list_fms").html()
        });
    });
    return data;
}

// Formatiert Fahrzeugliste um (mit FMS)
function car_list_printable(list) {
    var data = "";
    $.each(list, function (key, car) {
        data += "<br>&nbsp;&nbsp;&nbsp;<span class='building_list_fms building_list_fms_" + car.fms + "'>" + car.fms + "</span> " + car.name;
    });
    return data;
}

// Wachen-Planung
function drawCircles(radius) {
    $.each(markers, function (key, value) {
        map.removeLayer(value);
    });
    markers = [];
    var data = get_buildings();
    map.attributionControl.addAttribution("Wachen-Planung by Lost &amp; Northdegree");
    // Map refresh
    map.invalidateSize(true);
    // Add markers for all buildings
    $.each(data, function (key, value) {
        var col = 'red',
            draw = false;
        if (value.stationType == 0 && $('#mark_fw').is(":checked")) {
            draw = true;
        } else if (value.stationType == 6 && $('#mark_pol').is(":checked")) {
            draw = true;
            col = 'green';
        } else if (value.stationType == 2 && $('#mark_rw').is(":checked")) {
            draw = true;
            col = 'orange';
        } else if (value.stationType == 9 && $('#mark_thw').is(":checked")) {
            draw = true;
            col = 'darkblue';
        } else if (value.stationType == 11 && $('#mark_bp').is(":checked")) {
            draw = true;
            col = 'lightblue';
        } else if (value.stationType == 4 && $('#mark_kh').is(":checked")) {
            draw = true;
            col = 'black';
        }
        if (draw == true) {
            var cars = '<span class="building_leaflet_text" style="z-index:99999; color: ' + col + ';"><i class="fa fa-building"></i> ' + value.stationName + '</span>' + car_list_printable(car_list(value.stationId)),
                circle = L.circle([value.stationLat, value.stationLng], radius, {
                    color: col,
                    fillOpacity: 0.3,
                    riseOnHover: true
                }).addTo(map);
            circle.bindLabel(cars);
            markers.push(circle);
        }
    });
}


// Gebäude neu zeichnen
function redraw_buildings() {
    $.each(building_markers, function (key, value) {
        var cars = car_list(value.building_id),
            data = value.options.title;
        if (cars.length > 0) {
            data += '&nbsp;<i class="fa fa-car"></i>' + cars.length;
            data += car_list_printable(cars);
        }
        value.bindLabel(data, {zIndex: 999});
    });
    building_maps_redraw();
}

// === Ueberschreibe LSS-Funktionen ===
/* Hook into alliance messages for message count */
// ==-> To-Do: Catch everything with Faye
var org_allianceChat = allianceChat;
allianceChat = function(e){
    if(e.user_id!=user_id && curwindow!="#chat_outer")
        newmessages++;
    org_allianceChat(e);
}

/* Overwrite LSS function for radio messages */
// ==-> To-Do: Catch everything with Faye
var org_radioMessage = radioMessage;
var radioMessage = function (e) {
    // FMS5 fuer Verband
    if (e.type == "vehicle_fms" && e.fms == 5 && e.user_id != user_id && nofms == true) {
        return false;
    }
    // FMS bei Gebaeuden updaten
    if (e.user_id == user_id) {
        redraw_buildings();
    }
    org_radioMessage(e);
};

/* Overwrite LSS function for building markers */
//var org_building_maps_draw = building_maps_draw;
building_maps_draw = function (e) {
    //org_building_maps_draw(e);
    var t = L.marker([e.latitude, e.longitude], {
        title: e.name,
        icon: icon_empty,
        riseOnHover: true
    }).bindLabel(e.name).addTo(map);
    t.building_id = e.id, "undefined" != typeof e.opacity && t.setOpacity(e.opacity), iconMapGenerate(e.building_marker_image, t), t.on("click", function () {
        lightboxOpen("/buildings/" + e.id)
    }), building_markers.push(t);
    $.each(building_markers, function (key, value) {
        value.hideLabel();
        value.unbindLabel();
        cars = car_list(value.building_id);
        data = value.options.title;
        if (cars.length > 0) {
            data += '&nbsp;<i class="fa fa-car"></i>' + cars.length;
            data += car_list_printable(cars);
        }
        value.bindLabel(data, {zIndex: 999});
    });
};

// === Switches in Einstellungen ===
// Version 4
function d_v4() {
    if ($("#s-v4").is(":checked")) {
        vv4 = true;
        $("#s_close").css("display", "block");
        $("#map").css("height", "550px");
        $("#missions_outer").css("display", "");
        $("#missions-panel-body").css("height", "1320px");
        $("footer").css("display", "none");
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
            .css("display", "")
            .css("z-index", "999")
            .fadeOut(500);
        $("#missions-aa, #verband-aa, #buildings-aa, #chat-aa, #radio-aa").addClass("disabled");
        $('#missions_outer,#chat_outer,#buildings_outer,#radio_outer,#map_outer')
            .css("opacity", "1")
            .css("filter", "")
            .css("-webkit-filter", "")
            .css("-moz-filter", "")
            .css("-o-filter", "")
            .css("-ms-filter", "");
        $('#settings-spin').removeClass('fa-spin');
    } else {
        vv4 = false;
        $("#missions_outer,#buildings_outer,#chat_outer,#radio_outer")
            .removeAttr("style")
            .css("display", "none")
            .css("width", "33%")
            .css("right", "0")
            .css("position", "absolute");
        $("#map").css("height", "900px");
        $("#map-switch").css("background-color", "");
        $("#missions-aa, #verband-aa, #buildings-aa, #chat-aa, #radio-aa").addClass("disabled");
        $("#settings_outer")
            .css("z-index", "");
        $("#missions-panel-body").css("height", "850px");
    }
}
$("#s-v4").click(d_v4);

// Map Mode
function mapMode() {
    if ($("#myonoffswitch").is(":checked")) {
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
            .css("margin-top", "")
            .fadeIn(500)
            .slideDown(1000);

        $("#settings_outer").css("display", "none").css("z-index", "999");

        $("#missions-aa, #verband-aa, #buildings-aa, #chat-aa, #radio-aa").addClass("disabled");

        $('#missions_outer,#chat_outer,#buildings_outer,#radio_outer,#map_outer')
            .css("opacity", "1")
            .css("filter", "")
            .css("-webkit-filter", "")
            .css("-moz-filter", "")
            .css("-o-filter", "")
            .css("-ms-filter", "");

        $('#settings-spin').removeClass('fa-spin');
    } else {
        nomap = false;
        $("#missions_outer,#buildings_outer,#chat_outer,#radio_outer")
            .removeAttr("style")
            .css("display", "none")
            .css("width", "33%")
            .css("right", "0")
            .css("position", "absolute");
        $("#map").css("display", "");
        $("#map-switch").css("background-color", "");
        $("#missions-aa, #verband-aa, #buildings-aa, #chat-aa, #radio-aa").addClass("disabled");
        $("#settings_outer")
            .css("z-index", "");
    }
}
$("#myonoffswitch").click(mapMode);

// Markierungen auf den maps
$('#x_radius,#mark_kh,#mark_bp,#mark_thw,#mark_rw,#mark_pol,#mark_fw').click(function () {
    if ($('#building_helper').is(":checked")) {
        if (!$('#x_radius').is(":checked")) {
            drawCircles(5000);
        } else {
            drawCircles(10000);
        }
    }
});

// Wachen-Planung
function build_help() {
    // on first click:
    if ($("#building_helper").is(":checked")) {
        $('#map_outer')
            .css("opacity", "1")
            .css("filter", "blur(0px)")
            .css("-webkit-filter", "blur(0px)")
            .css("-moz-filter", "blur(0px)")
            .css("-o-filter", "blur(0px)")
            .css("-ms-filter", "blur(0px)");
        if (!$('#x_radius').is(":checked")) {
            drawCircles(5000);
        } else {
            drawCircles(10000);
        }
    } else {
        $('#map_outer')
            .css("opacity", "0.3")
            .css("filter", "blur(7px)")
            .css("-webkit-filter", "blur(7px)")
            .css("-moz-filter", "blur(7px)")
            .css("-o-filter", "blur(7px)")
            .css("-ms-filter", "blur(7px)");
        $.each(markers, function (key, value) {
            map.removeLayer(value);
        });
        markers = [];
        map.attributionControl.removeAttribution("Wachen-Planung by Lost &amp; Northdegree");
    }
}
$("#building_helper").click(build_help);

// FMS5 von Verbandsmitgliedern
function fms_switch() {
    nofms =  $("#sw_verband").is(":checked");
}
$("#sw_verband").click(fms_switch);

// Map neu ausrichten
$('#map_reload').click(function () {
    setTimeout(function () {
        $('#map_reload').attr("checked", false);
        map.invalidateSize(true);
    }, 300);
});

/* Redraw buildings when script is loaded */
redraw_buildings();
// Design Funktionen Ende
