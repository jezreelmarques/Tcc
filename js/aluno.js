var Aluno = function(id, nome, email, telefone, logradouro, numero, bairro, cidade) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.logradouro = logradouro;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;


    this.createTable = function() {
        var query = 'CREATE TABLE IF NOT EXISTS ' +
            'aluno' +
            '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
            'nome VARCHAR NOT NULL,' +
            'email VARCHAR NOT NULL,' +
            'teleone VARCHAR NOT NULL,' +
            'logradouro VARCHAR NOT NULL,' +
            'numero INTEGER, ' +
            'bairro VARCHAR NOT NULL,' +
            'cidade VARCHAR NOT NULL' +
            ');';
        try {

            sqlLite.localDB.transaction(function(transaction) {
                transaction.executeSql(query, [],
                    sqlLite.nullDataHandler,
                    sqlLite.errorHandler);

                sqlLite.updateStatus("Tabela 'aluno' status: OK.");
            });
        } catch (e) {
            sqlLite.updateStatus("Erro: Tabela 'aluno' não criada " + e + ".");
            return;
        }
    };


    this.insert = function() {
        if (this.id != null)
            return false;
        this.createTable();

        var query = "insert into aluno" +
            "(nome, email, teleone, logradouro, numero, bairro, cidade)" +
            "VALUES"
            //+"(?, ?,?, ?, ?, ?, ?);";
            +
            "('" + this.nome + "', '" + this.email + "','" + this.telefone + "', '" + this.logradouro + "', '" + this.numero + "', '" + this.bairro + "', '" + this.cidade + "');";
        //console.log(query);
        //console.log(this.nome);
        try {
            var r = sqlLite.localDB.transaction(function(transaction) {
                return transaction.executeSql(
                    query,
                    /*[
                    	this.nome,
                    	this.email, 
                    	this.telefone, 
                    	this.logradouro,  
                    	this.numero, 
                    	this.bairro, 
                    	this.cidade
                    ]*/
                    [],
                    function(transaction, results) {
                        if (!results.rowsAffected) {
                            sqlLite.updateStatus("Erro: Inserção não realizada");
                        } else {
                            //updateForm("", "", "");
                            sqlLite.updateStatus("Inserção realizada, linha id: " + results.insertId);
                            // id=this.findLast();
                            this.id = results.insertId;
                            return true;
                        }
                    },
                    sqlLite.errorHandler
                );
            });
            console.log(r);
            return false;
        } catch (e) {
            sqlLite.updateStatus("Erro: INSERT não realizado " + e + ".");
        }


    };


    this.find = function() {

    };

    this.findAll = function(callback) {

        query = "SELECT * FROM aluno;";
        //console.log(query);
        try {
            sqlLite.localDB.transaction(function(transaction) {

                transaction.executeSql(query, [], function(transaction, results) {
                    var rows = new Array();
                    for (var i = 0; i < results.rows.length; i++) {
                        rows.push(results.rows.item(i));

                    }
                    //console.log(rows);
                    callback(rows);
                }, function(transaction, error) {
                    sqlLite.updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
                    //console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
                    callback(false);
                });
            });
        } catch (e) {
            updateStatus("Error: SELECT não realizado " + e + ".");
            callback(false);
        }

    };

    this.update = function() {

    };

    this.delete = function(id, callback) {
        query = "DELETE FROM aluno WHERE id=" + id + " ;";
        //console.log(query);
        try {
            sqlLite.localDB.transaction(function(transaction) {
                transaction.executeSql(query, [], function(transaction, results) {
                    console.log(transaction);
                    if (!results.rowsAffected) {
                        console.log("Erro: Delete não realizado.");
                    } else {
                        console.log("Linhas deletadas:" + results.rowsAffected);
                    }
                });

            });
        } catch (e) {

            //console.log("Erro: DELETE não realizado " + e + ".");
        }
    };

}


$(document).ready(function() {
    $("#add").click(function() {

        $("#input").css("display", "block");
    });

    $("#saveAluno").click(function(e) {
        e.preventDefault();
        aluno = new Aluno(
            null,
            $("#inputNomeAluno").val(),
            $("#inputEmailAluno").val(),
            $("#inputTelefoneAluno").val(),
            $("#inputLogradouroAluno").val(),
            $("#inputNumeroAluno").val(),
            $("#inputBairroAluno").val(),
            $("#inputCidadeAluno").val()
        );
        aluno.insert();
    });


    function listAluno() {
        var aluno = new Aluno();
        aluno.findAll(function(resultado) {
            if (resultado) {
                $("#itensDataAluno").empty();
                for (i = 0; i < resultado.length; i++) {
                    console.log(resultado[i]);
                    $("#itensDataAluno").append(
                        "<tr><td>" + resultado[i].id +
                        "</td><td>" + resultado[i].nome +
                        "</td><td>" + resultado[i].teleone +
                        // "</td><td>" + resultado[i].email +
                        //"</td><td>" + resultado[i].logradouro + ", " + resultado[i].numero + ", " + resultado[i].bairro + ", " + resultado[i].cidade +
                        "</td><td>" +
                        "<button data-id='" + resultado[i].id + "' class='excluirAluno'>Excluir</button>" +

                        "</td>" +
                        "</tr>"
                    );
                }
                $(document).on('click', '.excluirAluno', function() {
                    element = $(this);

                    id = element.data('id');
                    aluno.delete(id, function() {
                        list();
                    });

                });
            }
        });
    }

    listAluno();
});