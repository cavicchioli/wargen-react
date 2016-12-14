/**
 * @author Victor Cavichiolli ~xvictorprado@gmail.com
 * @since 2016-12-02
 */

'use strict';

var pg = require("pg");
var config = require("../../config/index.js");

/**
 * @method GET
 * @description Retorna todos os incidentes de um usuário
 *              
 */
exports.retornaTodasGrandesAreas = function(req, callback) {





    var sql = "select grd_codigo, grd_nome from cnpq_grandes_areas where grd_dtcanc is null";

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);

        } else {

            client.query(sql, function(err, result) {

                done();

                if (err) {

                    var ret = {
                        sucess: false,
                        msg: err
                    };

                    callback(ret);

                } else {

                    if (result.rowCount > 0) {

                        callback(result.rows);

                    } else {
                        var ret = {
                            sucess: false,
                            msg: 'Não foi possível localizar nenhum registro.'
                        };

                        callback(ret);
                    }
                }

                client.end();

            });
        }
    });
};

/**
 * @method GET
 * @description Retorna todas as áreas do cnpq
 *              
 */
exports.retornaTodasAreas = function(req, callback) {

    var sql = "select are_codigo, are_nome from cnpq_areas where are_dtcanc is null and grd_codigo = $1";

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);

        } else {

            client.query(sql,[req.body.grd_codigo], function(err, result) {

                done();

                if (err) {

                    var ret = {
                        sucess: false,
                        msg: err
                    };

                    callback(ret);

                } else {

                    if (result.rowCount > 0) {

                        callback(result.rows);

                    } else {
                        var ret = {
                            sucess: false,
                            msg: 'Não foi possível localizar nenhum registro.'
                        };

                        callback(ret);
                    }
                }

                client.end();

            });
        }
    });
};

/**
 * @method GET
 * @description Retorna todas as subareas do cnpq
 *              
 */
exports.retornaTodasSubAreas = function(req, callback) {

    var sql = "select sub_codigo, sub_nome from cnpq_sub_areas where sub_dtcanc is null and are_codigo = $1";

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);

        } else {

            client.query(sql,[req.body.are_codigo], function(err, result) {

                done();

                if (err) {

                    var ret = {
                        sucess: false,
                        msg: err
                    };

                    callback(ret);

                } else {

                    if (result.rowCount > 0) {

                        callback(result.rows);

                    } else {
                        var ret = {
                            sucess: false,
                            msg: 'Não foi possível localizar nenhum registro.'
                        };

                        callback(ret);
                    }
                }

                client.end();

            });
        }
    });
};