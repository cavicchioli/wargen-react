"use strict";

function Usuario(id, nome, email, email_conf, senha, senha_conf) {
	"use strict";
	var
		_id = ko.observable(id),
		_nome = ko.observable(nome),
		_email = ko.observable(email),
		_email_conf = ko.observable(email_conf),
		_senha = ko.observable(senha),
		_senha_conf = ko.observable(senha_conf);

	return {
		id: _id,
		nome: _nome,
		email: _email,
		email_conf: _email_conf,
		senha: _senha,
		senha_conf: _senha_conf
	};
}