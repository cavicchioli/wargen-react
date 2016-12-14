$(function() {

    //MODEL
    var Projeto = function(data) {
        this.nome = ko.observable(data.nome);
        this.desc = ko.observable(data.desc);
        this.tipo = ko.observable(data.tipo);
       // this.usuario = ko.observable(data.email_conf);
   };

   Projeto.prototype.insereProjeto = function() {

    var request = $.ajax({
        type: "POST",
        url: "/projeto/criar",
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:
            //JSON.stringify (
            {
                nome: this.nome(),
                desc: this.desc(),
                tipo: this.tipo()
            }
        }).done(function(response) {
            console.log(response);

            if (response.sucess) {

                alert('Cadastrou o Projeto');
                //window.location.href = '/login';
            } else {


                alert(response.msg);
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


    var ProjetosViewModel = function() {
        var self = this;
        self.projetos = ko.observableArray();

        self.criaProjeto = function() {
            var projeto = new Projeto({
                nome: $('#nome').val(),
                desc: $('#desc').val(),
                tipo: $('input[name="tipo"]:checked').val()
            });

            projeto.insereProjeto();
        }
    };

    var viewModel = new ProjetosViewModel();

    ko.applyBindings(viewModel);
});