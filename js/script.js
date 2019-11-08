$(document).ready(function() {

    $("#btn-Aluno").click(function() {
        $("#form-addAluno").css("display", "block");
    });

    $("#btn-Escola").click(function() {
        $("#form-addEscola").css("display", "block");
    });

    $('#btn-menu').click(function() {
        $('#divMenu').css("display", "block");
        $('#map').css("display", "none");
        $('#btn-menu').css("display", "none");
        $('#btn-menuVoltar').css("display", "block");
        $('#divMenu').animate({
            height: "100%",
        });
    });

    $('#btn-menuVoltar').click(function() {
        $('#divMenu').css("display", "none");
        $('#map').css("display", "block");
        $('#btn-menu').css("display", "block");
        $('#btn-menuVoltar').css("display", "none");
        $('#divMenu').animate({
            height: "0%",
        });
    });






});




var map, infoWindow;

function createMap() {
    var options = {
        center: {
            lat: -29.658842,
            lng: -50.785850
        },
        zoom: 14,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false

    };

    map = new google.maps.Map(document.getElementById('map'), options);
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(p) {
            var position = {
                lat: p.coords.latitude,
                lng: p.coords.longitude
            };

            infoWindow.setPosition(position);
            infoWindow.setContent('Your location!');
            infoWindow.open(map);
            map.setCenter(position);
        }, function() {
            handleLocationError('Geolocation service failed', map.getCenter());
        });
    } else {
        handleLocationError('No geolocation available.', map.getCenter());
    }

}

function handleLocationError(content, position) {
    infoWindow.setPosition(position);
    infoWindow.setContent(content);
    infoWindow.open(map);
}