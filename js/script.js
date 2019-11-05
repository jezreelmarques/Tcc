var map, infoWindow;

function createMap() {
    var options = {
        center: { lat: -29.658842, lng: -50.785850 },
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

//Script para salvar formulario de adicionar aluno
function salvarAluno() {
    var nomeCompletoAluno = document.getElementById("nomeCompletoAluno");
    var celularAluno = document.getElementById("celularAluno");
    var ruaAluno = document.getElementById("ruaAluno");
    var numeroCasaAluno = document.getElementById("numeroCasaAluno");
    var cidadeAluno = document.getElementById("cidadeAluno");
    var estadoAluno = document.getElementById("estadoAluno");
    var cepAluno = document.getElementById("cepAluno");


}

//Script para salvar formulario de adicionar escola
function salvarEscola() {
    var nomeCompletoEscola = document.getElementById("nomeCompletoEscola");
    var ruaEscola = document.getElementById("ruaEscola");
    var numeroEscola = document.getElementById("numeroEscola");
    var cidadeEscola = document.getElementById("cidadeEscola");
    var estadoEscola = document.getElementById("estadoEscola");
    var cepEscola = document.getElementById("cepEscola");



}