/**
 * @author Victor Cavichiolli ~xvictorprado@gmail.com
 * @since 2016-11-18
 */

'use strict';

var pg = require("pg");
var config = require("../../config/index.js");
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

/**
 * @description Create a token to the user, we will use this token after to validate the session in a middleware.
 *              Cria um token para o usuário, nós vamos utilizar esse token depois para validar a sessão em uma middleware.
 */
function createUserToken(id, name, email, type) {

    var token = jwt.sign({
        _id: id,
        name: name,
        email: email,
        type: type
    }, config.secretKey, {
        expiresIn: 86400
    });
    return token;
};

/**
 * @method POST
 * @description Insert new user in the database.
 *              Insere um novo usuário no banco de dados.
 */
exports.newUser = function(req, callback) {

    console.log("NEW USER:: Name:" + req.body.name + " Email:" + req.body.email + " Email Conf.:" + req.body.email_conf + " Password:" + req.body.password + "Password Conf." + req.body.password_conf);

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);

        } else {

            bcrypt.hash(req.body.password, null, null, function(err, hash) {

                if (err) {

                    var ret = {
                        sucess: false,
                        msg: err
                    };

                    callback(ret);
                }

                client.query("select sp_wargen_cadastra_usuario($1,$2,$3,$4,$5) as msg", [req.body.name, req.body.email, req.body.email_conf, hash, hash],

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
            });
        }

    });
};

/**
 * @method GET
 * @description Validate if the user are authenticated correctly and create a new token.
 *              Valida se o usuário está autenticado corretamente e cria um novo token.
 */
exports.validateUserSession = function(req, callback) {

    console.log("USER LOGIN:: Email:" + req.body.email + "Password:" + req.body.password);

    pg.connect(config.connectionString, function(err, client, done) {

        if (err) {
            console.log(err);

            var ret = {
                sucess: false,
                msg: err,
                token: null
            };

            callback(ret);

        } else {

            client.query("select usu_cod, usu_nome, usu_email, usu_senha as hash, usu_tipo from usuarios where usu_dtcanc is null and usu_email = $1", [req.body.email],

                function(err, result) {

                    done();

                    if (err) {
                        console.log(err);

                        var ret = {
                            sucess: false,
                            msg: err,
                            token: null
                        };

                        callback(ret);

                    } else {

                        if (result.rowCount > 0) {
                            bcrypt.compare(req.body.password, result.rows[0]["hash"], function(err, res) {

                                if (res) {
                                    var ret = {
                                        sucess: true,
                                        msg: 'OK',
                                        token: createUserToken(result.rows[0]["usu_cod"], result.rows[0]["usu_nome"], result.rows[0]["usu_email"], result.rows[0]["usu_tipo"])
                                    };
                                } else {
                                    var ret = {
                                        sucess: false,
                                        msg: 'Email / Senha inválido.',
                                        token: null
                                    };
                                }

                                callback(ret);
                            });



                        } else {

                            var ret = {
                                sucess: false,
                                msg: 'Email / Senha inválido.',
                                token: null
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
 * @method DELETE
 * @description Delete user token, this function make the logout.
 *              Delata o token do usuário, essa função faz o logout.
 */
exports.deleteUserSession = function(req, callback) {

    console.log("USER LOGOUT:: Email:" + req.params.email);
};

/**
 * @method DELETE
 * @description Delete an user from database.
 *              Deleta um usuário da base de dados.
 */
exports.deleteUser = function(req, callback) {

    console.log("DELETE USER:: Email:" + req.params.email);

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);

        } else {
            client.query("select sp_wargen_deleta_usuario($1) as msg", [req.params.email],

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
        };
    });
};

/**
 * @method PUT
 * @description Alter an user password from database.
 *              Altera a senha do usuário da base de dados.
 */
exports.alterUserPassword = function(req, callback) {

    console.log("ALTER USER PASSWORD:: Email:" + req.params.email + " Old Password:" + req.body.old_password + " New Password:" + req.body.new_password + "New Password Conf." + req.body.new_password_conf);

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {

            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);

        } else {

            bcrypt.hash(req.body.new_password, null, null, function(err, hash) {

                if (err) {

                    var ret = {
                        sucess: false,
                        msg: err
                    };

                    callback(ret);
                }

                client.query("select sp_wargen_altera_usuario($1,$2,$3) as msg", [req.params.email, hash, hash],

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
            });
        }

    });
};

/**
 * @method GET
 * @description Return all users.
 *              Retorna todos os usuários.
 */
exports.returnAllUsers = function(req, callback) {

    var sql = "select usu_cod, usu_nome, usu_email, usu_senha, usu_dtreg, usu_dtcanc, usu_tipo from usuarios";

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
 * @description Return all users.
 *              Retorna todos os usuários.
 */
exports.returnUser = function(req, callback) {

    var sql = "select usu_cod, usu_nome, usu_email, usu_senha, usu_dtreg, usu_dtcanc, usu_tipo from usuarios where usu_email = $1";

    pg.connect(config.connectionString, function(err, client, done) {
        if (err) {
            var ret = {
                sucess: false,
                msg: err
            };

            callback(ret);
        } else {

            client.query(sql, [req.params.email], function(err, result) {

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
                            msg: 'Não foi possível localizar o usuário.'
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
 * @description Validate if the user token is correct, then return some user informations decoded.
 *              Valida se o token do usuário é correto e depois retorn algumas informações do usuário decodificada.
 */
exports.validateUserToken = function(req, res, next) {

    var token = req.body.token || req.params.token || req.headers['x-access-token'];

    console.log("Someone are trying to validate a token: " + token);

    if (token) {
        jwt.verify(token, config.secretKey, function(err, decoded) {

            if (err) {
                console.log(err);
                

            } else {
                req.decoded = decoded;

                console.log(decoded);

                next();
            }

        });
    } else {
        console.log(err);
    }
}
