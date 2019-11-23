var Rota = function(id, id_escola, turno, id_alunos) {
    this.id = id;
    this.id_escola = id_escola;
    this.turno = turno;
    this.id_alunos = id_alunos;


    this.createTable = function() {
        var query = 'CREATE TABLE IF NOT EXISTS ' +
            'rota ' +
            '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
            'id_escola INTEGER NOT NULL,' +
            'turno VARCHAR NOT NULL);';
        try {

            sqlLite.localDB.transaction(function(transaction) {
                transaction.executeSql(query, [],
                    sqlLite.nullDataHandler,
                    sqlLite.errorHandler);

                sqlLite.updateStatus("Tabela 'rota' status: OK.");
            });
        } catch (e) {
            sqlLite.updateStatus("Erro: Tabela 'rota' não criada " + e + ".");
        }

        setTimeout(function() {
            var query = 'CREATE TABLE IF NOT EXISTS ' +
                'aluno_rota ' +
                '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
                'id_rota INTEGER NOT NULL,' +
                'id_aluno INTEGER NOT NULL);';
            try {
                sqlLite.localDB.transaction(function(transaction) {
                    transaction.executeSql(query, [],
                        sqlLite.nullDataHandler,
                        sqlLite.errorHandler);

                    sqlLite.updateStatus("Tabela 'aluno_rota' status: OK.");
                });
            } catch (e) {

            };
        }, 100);
    }


    this.insert = function() {
        if (this.id != null)
            return false;
        this.createTable();

        var _this = this;

        var query = `insert into rota (id_escola, turno) VALUES ('${this.id_escola}', '${this.turno}');`;
        console.log(query);
        try {
            sqlLite.localDB.transaction(function(transaction) {
                transaction.executeSql(
                    query, [],
                    function(transaction, results) {
                        console.log(results);
                        console.log(transaction);
                        if (!results.rowsAffected) {
                            sqlLite.updateStatus("Erro: Inserção não realizada");
                        } else {
                            sqlLite.updateStatus("Inserção realizada, linha id: " + results.insertId);
                            _this.id = results.insertId;
                            return true;
                        }
                    },
                    sqlLite.errorHandler
                );
            });
        } catch (e) {
            sqlLite.updateStatus("Erro: INSERT não realizado " + e + ".");
        }

        setTimeout(() => {
            var query = `insert into aluno_rota (id_rota, id_aluno) VALUES `;
            var values = [];
            for (i in this.id_alunos) {
                values.push(`(${this.id}, ${this.id_alunos[i]})`);
            }
            query += values.join(',') + ';';
            console.log(query);
            try {
                sqlLite.localDB.transaction(function(transaction) {
                    transaction.executeSql(
                        query, [],
                        function(transaction, results) {
                            if (!results.rowsAffected) {
                                sqlLite.updateStatus("Erro: Inserção não realizada");
                            } else {
                                //sqlLite.updateStatus("Inserção realizada, linha id: " + results.insertId);
                                console.log(results);
                            }
                        },
                        sqlLite.errorHandler
                    );
                });
            } catch (e) {
                sqlLite.updateStatus("Erro: INSERT não realizado " + e + ".");
            }
        }, 100);

    };


    this.find = function(callback, id) {
        query = `SELECT * FROM rota r `;
        query += `JOIN escola e ON e.id = r.id_escola `
        query += `where r.id = ${id}`;
        var rows = new Array();
        try {
            sqlLite.localDB.transaction(function(transaction) {
                transaction.executeSql(query, [], function(transaction, results) {
                    for (var i = 0; i < results.rows.length; i++) {
                        rows[id] = results.rows.item(i);
                    }
                }, function(transaction, error) {
                    console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
                    callback(false);
                });
            });
        } catch (e) {
            updateStatus("Error: SELECT não realizado " + e + ".");
            callback(false);
        }
        setTimeout(() => {
            query = `SELECT * FROM aluno_rota r `;
            query += `JOIN aluno a ON a.id = r.id_aluno `
            query += `where r.id_rota = ${id}`;
            rows[id].alunos = [];
            try {
                sqlLite.localDB.transaction(function(transaction) {
                    transaction.executeSql(query, [], function(transaction, results) {
                        for (var i = 0; i < results.rows.length; i++) {
                            rows[id].alunos.push(results.rows.item(i));
                        }
                        console.log(rows);
                        callback(rows);
                    }, function(transaction, error) {
                        console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
                        callback(false);
                    });
                });
            } catch (e) {
                updateStatus("Error: SELECT não realizado " + e + ".");
                callback(false);
            }
        }, 100);
    };

    this.findAll = function(callback) {

        query = `SELECT r.id, e.nome, r.turno FROM rota r `;
        query += `JOIN escola e ON e.id = r.id_escola;`;
        console.log(query);
        try {
            sqlLite.localDB.transaction(function(transaction) {

                transaction.executeSql(query, [], function(transaction, results) {
                    var rows = new Array();
                    for (var i = 0; i < results.rows.length; i++) {
                        rows.push(results.rows.item(i));

                    }
                    console.log(rows);
                    callback(rows);
                }, function(transaction, error) {
                    console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
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
        query = "DELETE FROM rota WHERE id=" + id + ";";


        console.log(query);
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

            console.log("Erro: DELETE não realizado " + e + ".");
        }
    };

}

function listRota() {
    var rota = new Rota();
    rota.findAll(function(resultado) {
        if (resultado) {
            $("#itensDataRota").empty();
            for (i = 0; i < resultado.length; i++) {
                $("#itensDataRota").append(
                    "<tr><td>" + resultado[i].id +
                    "</td><td>" + resultado[i].nome +
                    "</td><td>" + resultado[i].turno +
                    "</td><td>" +
                    "<button data-id='" + resultado[i].id + "' class='iniciarRota'>Iniciar</button>" +
                    "</td><td>" +
                    "<button id='" + resultado[i].id + "' class='excluirRota'>Excluir</button>" +
                    "</td>" +
                    "</tr>"
                );
            }

            $(document).on('click', '.iniciarRota', function() {
                element = $(this);
                id = element.data('id');

                rota.find(function(data) {
                    // Iniciando a rota.
                    console.log(data[id].logradouro);
                }, id)
            });

            $(document).on('click', '.excluirRota', function() {
                element = $(this);
                id = element.attr('id');
                rota.delete(id, function() {
                    list();
                });


            });

        }
    });
}




$(document).ready(function() {

    $("#saveRota").click(function(e) {
        e.preventDefault();

        rota = new Rota(
            null,
            $("#selectRotaEscola").val(),
            $("#selectRotaTurno").val(),
            $("#selectRotaAluno").val()
        );
        rota.insert();

    });
});