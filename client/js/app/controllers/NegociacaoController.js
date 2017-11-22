class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        let self = this;

        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");

        //Aplicar proxy
        this._negociacoes = ProxyFactory.create(new ListaNegociacoes(), ['adiciona', 'esvazia'], model =>
            this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($("#negociacoes"));
        this._negociacoesView.update(this._negociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
    }

    _criaNegociacao() {
       return new Negociacao(DateHelper.textoParaData(this.inputData.value), this.inputQuantidade.value, this.inputValor.value);
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._mensagemView.update(this._mensagem);
    }

    apaga() {

        this._negociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }


}