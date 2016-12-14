/**
 * @author Victor Cavichiolli ~xvictorprado@gmail.com
 * @since 2016-12-05
 */

'use strict';

var db = require("../models/cnpq_model.js");

exports.retornaTodasGrandesAreas = function(req, res) {
	db.retornaTodasGrandesAreas(req, function(result) {
		res.send(result);
	});
};

exports.retornaTodasAreas = function(req, res) {
	if (req.params.grd_codigo == null || req.params.grd_codigo == undefined) {
		res.send({
			sucess: false,
			msg: 'É necessário preencher o CÓDIGO DA GRANDE ÁREA.'
		});
	} else {
		db.retornaTodasAreas(req, function(result) {
			res.send(result);
		});
	}
};

exports.retornaTodasSubAreas = function(req, res) {
	if (req.params.are_codigo == null || req.params.are_codigo == undefined) {
		res.send({
			sucess: false,
			msg: 'É necessário preencher o CÓDIGO DA ÁREA.'
		});
	} else {
		db.retornaTodasSubAreas(req, function(result) {
			res.send(result);
		});
	}
};