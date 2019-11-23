$(document).ready(function() {

    $("#btn-Aluno").click(function() {
        $("#form-addAluno").css("display", "block");
    });


    $("#btn-Escola").click(function() {
        $("#form-addEscola").show();
        $("#btn-Escola").hide();
        $("#btn-EscolaVoltar").show();
    });

    $("#btn-EscolaVoltar").click(function() {
        $("#form-addEscola").hide();
        $("#btn-Escola").show();
        $("#btn-EscolaVoltar").hide();
    });

    $("#btn-Aluno").click(function() {
        $("#form-addAluno").show();
        $("#btn-Aluno").hide();
        $("#btn-AlunoVoltar").show();
    });

    $("#btn-AlunoVoltar").click(function() {
        $("#form-addAluno").hide();
        $("#btn-Aluno").show();
        $("#btn-AlunoVoltar").hide();

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
        $('#divMenu').animate({
            height: "0%",

        });
        $('#map').css("display", "block");
        $('#btn-menu').css("display", "block");
        $('#btn-menuVoltar').css("display", "none");
        $('#divMenu').css("display", "none");
        $("#escolas").css("display", "none");
        $("#alunos").css("display", "none");
        $("#form-addEscola").css("display", "none");
        $("#form-addRota").css("display", "none");
        $("#rotas").css("display", "none");


    });

    $("#nav-escola").click(function() {
        $("#escolas").css("display", "block");
        $("#divMenu").css("display", "none");
    });

    $("#nav-aluno").click(function() {
        $("#alunos").css("display", "block");
        $("#divMenu").css("display", "none");
    });

    $("#nav-rota").click(function() {
        listRota();
        $("#rotas").css("display", "block");
        $("#divMenu").css("display", "none");
    });

    $("#btn-Rota").click(function() {
        $("#form-addRota").css("display", "block");

    });









    let aluno = new Aluno();
    aluno.findAll(function(resultado) {
        if (resultado) {
            for (i = 0; i < resultado.length; i++) {
                $("#rotas select[name='aluno']").append('<option value=' + resultado[i].id + '>' + resultado[i].nome + '</option')
            }
        }
    });

    setTimeout(function() {
        let escola = new Escola();
        escola.findAll(function(resultado) {
            if (resultado) {
                for (i = 0; i < resultado.length; i++) {
                    $("#rotas select[name='escola']").append('<option value=' + resultado[i].id + '>' + resultado[i].nome + '</option')
                }
            }
        });
    }, 100);


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