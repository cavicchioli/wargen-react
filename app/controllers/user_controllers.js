/**
 * @author Victor Cavichiolli ~xvictorprado@gmail.com
 * @since 2016-11-18
 */

'use strict';

var db = require("../models/user_model.js");

exports.newUser = function(req, res) {
    if (req.body.name == null || req.body.name == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo NOME COMPLETO.'
        });
    } else if (req.body.email == null || req.body.email == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo E-MAIL.'
        });
    } else if (req.body.email_conf == null || req.body.email_conf == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo CONFIRMAR E-MAIL.'
        });
    } else if (req.body.email != req.body.email_conf) {
        res.send({
            sucess: false,
            msg: 'O campo E-MAIL e CONFIRMAR E-MAIL não conferem.'
        });
    } else if (req.body.password == null || req.body.password == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo SENHA.'
        });
    } else if (req.body.password_conf == null || req.body.password_conf == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo CONFIRMAR SENHA.'
        });
    } else if (req.body.password != req.body.password_conf) {
        res.send({
            sucess: false,
            msg: 'O campo E-MAIL e CONFIRMAR E-MAIL não conferem.'
        });
    } else {
        db.newUser(req, function(result) {

            res.send(result);
            console.log(result);
        });
    }
};

exports.validateUserSession = function(req, res, next) {
    if (req.body.email == null || req.body.email == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo E-MAIL.'
        });
    } else if (req.body.password == null || req.body.password == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo SENHA.'
        });
    } else {
        db.validateUserSession(req, function(result) {

            res.send(result);
            console.log(result);
            //console.log('Chegou a retornar da execução da função no model, que valida o user');
        });
    }
};

exports.deleteUserSession = function(req, res) {
    if (req.params.email == null || req.params.email == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o parâmetro E-MAIL.'
        });
    } else {
        db.deleteUserSession(req, function(result) {

            res.send(result);
            console.log(result);
        });
    }
};

exports.deleteUser = function(req, res) {
    if (req.params.email == null || req.params.email == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o parâmetro E-MAIL.'
        });
    } else {
        db.deleteUser(req, function(result) {

            res.send(result);
            console.log(result);
        });
    }
};

exports.alterUserPassword = function(req, res) {
    if (req.params.email == null || req.params.email == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o parâmetro E-MAIL.'
        });
    } else if (req.body.old_password == null || req.body.old_password == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo SENHA ATUAL.'
        });
    } else if (req.body.new_password == null || req.body.new_password == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo NOVA SENHA.'
        });
    } else if (req.body.new_password_conf == null || req.body.new_password_conf == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o campo CONFIRMAR NOVA SENHA.'
        });
    } else if (req.body.new_password != req.body.new_password_conf) {
        res.send({
            sucess: false,
            msg: 'O campo NOVA SENHA e CONFIRMAR CONFIRMAR NOVA SENHA não conferem.'
        });
    } else {
        db.alterUserPassword(req, function(result) {

            res.send(result);
            console.log(result);
        });
    }
};

exports.returnAllUsers = function(req, res) {

    db.returnAllUsers(req, function(result) {

        res.send(result);
        console.log(result);
    });
};

exports.returnUser = function(req, res) {
    if (req.paramss.email == null || req.paramss.email == undefined) {
        res.send({
            sucess: false,
            msg: 'É necessário preencher o parâmetro E-MAIL.'
        });
    } else {
        db.returnUser(req, function(result) {

            res.send(result);
            console.log(result);
        });
    }
};

exports.validateUserToken = function(req, res, next) {
    db.validateUserToken(req, res, function(result) {
        console.log(result);
        next();
    });

};
