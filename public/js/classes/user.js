$(function() {
    //MODEL
    var Usuario = function(data) {
        this.nome = ko.observable(data.nome);
        this.email = ko.observable(data.email);
        this.email_conf = ko.observable(data.email_conf);
        this.senha = ko.observable(data.senha);
        this.senha_conf = ko.observable(data.senha_conf);
    };



    Usuario.prototype.criaUsuario = function() {

        var request = $.ajax({
            type: "POST",
            url: "/usuario/criar",
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:
            //JSON.stringify (
            {
                nome: this.nome(),
                email: this.email(),
                email_conf: this.email_conf(),
                senha: this.senha(),
                senha_conf: this.senha_conf()

            },
            sucess: function(data) {
                console.log(data);
            }
        }).done(function(response) {
            console.log(response);

            if (response.sucess) {
                window.location.href = '/login';
            } else {
                $('#pnlMsg').html('<div class="alert alert-danger" role="alert">' + response.msg + '</div>');
            }

            /*
                        viewModel.usuarios.push(new Usuario({
                            email: response.email,
                            senha: response.senha 
                        }));
                        */
        });
    }

    Usuario.prototype.logarUsuario = function() {

        console.log('O botão para logar usuário foi clicado!');

        var request = $.ajax({
            type: "POST",
            url: "/usuario/logar",
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:
            //JSON.stringify (
            {
                email: this.email(),
                senha: this.senha()
            }

        }).done(function(response) {
            console.log('chegou aqui e passou pelo done');
            console.log(response);

            if (response.sucess) {
                  console.log(response.token);

                localStorage.setItem("token", response.token);
                window.location.href = '/dev';
            } else {
                $('#pnlMsg').html('<div class="alert alert-danger" role="alert">' + response.msg + '</div>');
            }

            /*
                        viewModel.usuarios.push(new Usuario({
                            email: response.email,
                            senha: response.senha 
                        }));
                        */
        });
    }

    var UsuariosViewModel = function() {
        var self = this;
        self.usuarios = ko.observableArray();

        self.addUsuario = function() {
            var usuario = new Usuario({
                nome: $('#nome').val(),
                email: $('#email').val(),
                email_conf: $('#email_conf').val(),
                senha: $('#senha').val(),
                senha_conf: $('#senha_conf').val()
            });

            usuario.criaUsuario();
        }

        self.validaUsuario = function() {
            var usuario = new Usuario({

                email: $('#email').val(),
                senha: $('#senha').val()
            });

            usuario.logarUsuario();
        }

        //var refresh = function () {
        //    var request = $.ajax({
        //        url: "/usuario/refresh/",
        //        type: "GET",
        //        dataType: "json"
        //    });

        //    request.done(function (response) {
        //        for (var i = 0; i < response.length; i++) {
        //            self.expenses.push(new Expense(response[i]));
        //        }
        //    });

        //    request.fail(function (jqXHR, textStatus) {
        //        console.log("Request failed: " + textStatus);
        //    });

        //}
        ////refresh immediately to load initial data
        //refresh();

    };

    var viewModel = new UsuariosViewModel();

    ko.applyBindings(viewModel);
});