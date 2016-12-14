'use strict';

var pg = require("pg");

var config = require("../../config/index.js");

/**
 * @method POST
 * @description Insert a new project to create a aplication.
 *              Insere um novo projeto para criar uma aplicação.
 */
exports.newProject = function(req, callback) {
    console.log("NEW PROJECT: Name:" + req.body.nome + " Description:" + req.body.desc + " Security type:" + req.body.tipo + " CNPQ (" + req.body.grande_area + "," + req.body.area + "," + req.body.subarea + "," + req.params.usuario + ")");

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {
            var ret = {
                sucess: false,
                msg: err
            };
            callback(ret);
        } else {
            client.query("select sp_wargen_cadastra_projeto($1,$2,$3,$4,$5,$6,$7) as msg", [req.body.nome, req.body.desc, req.body.tipo, req.body.grande_area, req.body.area, req.body.subarea, req.params.usuario],
                function(err, result) {
                    done();
                    if (err) {
                        console.log(err);
                        var ret = {
                            sucess: false,
                            msg: err
                        };
                        callback(ret);
                    } else {
                        if (result.rows[0]["msg"] == "OK") {
                            var ret = {
                                sucess: true,
                                msg: 'OK'
                            };
                            callback(ret);
                        } else {
                            var ret = {
                                sucess: false,
                                msg: result.rows[0]["msg"]
                            };
                            callback(ret);
                        }
                    }
                    client.end();
                });
        }
    });
};

//retornar projetos
//Filtros:  projetos públicos, projetos privados do usuario, por grande area, area e sub, descrição, autor
 //loadAplicação função que carrega um projeto existente pelo código dele.
 
//salvar aplicação  - função para salvar o projeto caso exista algo ele vai substituindo. (socket.io)
//na tela teremos um salvar como (atribui outro nome, etc..., um salvar, e um editar para editar as definições do projeto)
//teremos um fechar projeto que pode ou não usar, pois irá pergutar se quer salvar o projeto.

exports.retornaProjetoPorCodigo = function(req, res) {

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            res.send({
                erro: err
            });
        } else {

            client.query("select * from projetos where pro_cod = $1", [req.body.projeto], function(err, result) {

                done();

                if (err) {
                    console.log(err);
                    res.send({
                        erro: err
                    });
                } else {

                    res.send(result.rows);
                }

                client.end();

            });
        }
    });
};

exports.retornaProjetoPorUsuario = function(req, callback) {

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);
        } else {

            //5 - victor passar o usuário que vem do token
            client.query("select * from projetos where usu_cod = $1 and pro_dtcanc is null", [5], function(err, result) {

                done();

                if (err) {
                    var ret = {
                        sucess: false,
                        msg: err
                    };

                    callback(ret);
                } else {

                    callback(result.rows);
                }

                client.end();

            });
        }
    });
};

//retornar projetospublicos