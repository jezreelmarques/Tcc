var Escola = function(id, nome, email, telefone, logradouro, numero, bairro, cidade) {
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
            'escola' +
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

                sqlLite.updateStatus("Tabela 'escola' status: OK.");
            });
        } catch (e) {
            sqlLite.updateStatus("Erro: Tabela 'escola' não criada " + e + ".");
            return;
        }
    };


    this.insert = function() {
        if (this.id != null)
            return false;
        this.createTable();

        var query = "insert into escola" +
            "(nome, email, teleone, logradouro, numero, bairro, cidade)" +
            "VALUES"
            //+"(?, ?,?, ?, ?, ?, ?);";
            +
            "('" + this.nome + "', '" + this.email + "','" + this.telefone + "', '" + this.logradouro + "', '" + this.numero + "', '" + this.bairro + "', '" + this.cidade + "');";
        try {
            sqlLite.localDB.transaction(function(transaction) {
                transaction.executeSql(
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
            return false;
        } catch (e) {
            sqlLite.updateStatus("Erro: INSERT não realizado " + e + ".");
        }


    };


    this.find = function() {

    };

    this.findAll = function(callback) {

        query = "SELECT * FROM escola;";
        try {
            sqlLite.localDB.transaction(function(transaction) {

                transaction.executeSql(query, [], function(transaction, results) {
                    var rows = new Array();
                    for (var i = 0; i < results.rows.length; i++) {
                        rows.push(results.rows.item(i));

                    }
                    callback(rows);
                }, function(transaction, error) {
                    sqlLite.updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
                    //console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
                    callback(false);
                });
            });
        } catch (e) {
            sqlLite.updateStatus("Error: SELECT não realizado " + e + ".");
            callback(false);
        }

    };

    this.update = function() {

    };

    this.delete = function(id, callback) {
        query = "DELETE FROM escola WHERE id=" + id + " ;";
        try {
            sqlLite.localDB.transaction(function(transaction) {
                transaction.executeSql(query, [], function(transaction, results) {
                    if (!results.rowsAffected) {
                        console.log("Erro: Delete não realizado.");
                    } else {
                        console.log("Linhas deletadas:" + results.rowsAffected);
                    }
                });

            });
        } catch (e) {

            console.log("Erro: DELETE não realizado " + e + ".");
        }
    };

}


$(document).ready(function() {
  $("#add").click(function() {

      $("#input").css("display", "block");
  });

  $("#saveEscola").click(function(e) {
      e.preventDefault();
      escola = new Escola(
          null,
          $("#inputNomeEscola").val(),
          $("#inputEmailEscola").val(),
          $("#inputTelefoneEscola").val(),
          $("#inputlogradouroEscola").val(),
          $("#inputNumeroEscola").val(),
          $("#inputBairroEscola").val(),
          $("#inputCidadeEscola").val()
      );
      escola.insert();
      setTimeout(listEscola(), 100);
      $("#form-addEscola").hide();
  });


  $(".excluir").click(function() {
      return false;
  });
});

function listEscola() {
    escola = new Escola();
    escola.findAll(function(resultado) {
        if (resultado) {
            $("#itensDataEscola").empty();
            for (i = 0; i < resultado.length; i++) {
                $("#itensDataEscola").append(
                    "<tr><td>" + resultado[i].id +
                    "</td><td>" + resultado[i].nome +
                    "</td><td>" + resultado[i].teleone +
                    // "</td><td>" + resultado[i].email +
                    //"</td><td>" + resultado[i].logradouro + ", " + resultado[i].numero + ", " + resultado[i].bairro + ", " + resultado[i].cidade +
                    "</td><td>" +
                    "<button id='" + resultado[i].id + "' class='excluir'>Excluir</button>" +
                    "</td>" +
                    "</tr>"
                );
            }
            $(document).on('click', '.excluir', function() {
                element = $(this);

                id = element.attr('id');
                escola.delete(id, function() {
                    list();
                });

            });
        }
    });
}
