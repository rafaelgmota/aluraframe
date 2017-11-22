class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        let self = this;

        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");

        this._negociacoesView = new NegociacoesView($("#negociacoes"));
        this._negociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia');

        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');
    }

    _criaNegociacao() {
       return new Negociacao(DateHelper.textoParaData(this.inputData.value), this.inputQuantidade.value, this.inputValor.value);
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso";
    }

    importaNegociacoes() {
        let negociacaoService = new NegociacaoService();

        negociacaoService.obterNegociacoesDaSemana((erro, dado) => {
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }

            dado.forEach( objeto => this._negociacoes.adiciona(objeto));
            this._mensagem.texto = 'Negociacao importada com sucesso';
        });
    }

    apaga() {

        this._negociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }


}