class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);

        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this._negociacoes = new ListaNegociacoes();

        this._negociacoesView = new NegociacoesView($("#negociacoes"));

        this._negociacoesView.update(this._negociacoes);
    }

    _criaNegociacao() {
       return new Negociacao(DateHelper.textoParaData(this.inputData.value), this.inputQuantidade.value, this.inputValor.value);
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacoes.adiciona(this._criaNegociacao());

        this._negociacoesView.update(this._negociacoes);
    }


}