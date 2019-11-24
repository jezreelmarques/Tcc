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

    $(".iniciarRota").click(function() {
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



(function() {

    // Inicia o mapa.
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
    var map = new google.maps.Map(document.getElementById('map'), options);
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    var infoWindow = new google.maps.InfoWindow();
    // Valor default, a função abaixo vai sobreescrever se o usuário permitir
    // o geolocation.
    var my_location = null;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(p) {
            var position = {
                lat: p.coords.latitude,
                lng: p.coords.longitude
            };
            my_location = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
            infoWindow.setPosition(position);
            infoWindow.setContent('Your location!');
            infoWindow.open(map);
            map.setCenter(position);
        }, function() {
            handleLocationError('Geolocation service failed', map.getCenter());
        });
    } else {
        handleLocationError('No geolocation available.', map.getCenter());
        my_location = 'Taquara, RS Brasil';
    }


    function handleLocationError(content, position) {
        infoWindow.setPosition(position);
        infoWindow.setContent(content);
        infoWindow.open(map);
    }


    function doDirection(address) {
        var request = {
            origin: my_location,
            destination: address,
            provideRouteAlternatives: false,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(request, function(response, status) {
            console.log(response);
            if (status == 'OK') {
                directionsRenderer.setDirections(response);
                // Pega o tempo e a distancia.
                var duration = response.routes[0].legs[0].duration.text;
                var distance = response.routes[0].legs[0].distance.text;
                alert(`distancia: ${distance}, duração: ${duration}`);
            } else if (status = 'NOT_FOUND') {
                alert("Endereço não encontrado.");
            }
        });
    }


    $("#itensDataRota").click(function(e) {
        e.preventDefault();
        //var address = $("[name='address']", this).val();
        //address = 'Parobe, RS';
        address = address;
        if (address) {
            doDirection(address);
        }
    });



})();