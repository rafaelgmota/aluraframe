class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);

        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this.negociacoes = new ListaNegociacoes();
    }

    _criaNegociacao() {
       return new Negociacao(DateHelper.textoParaData(this.inputData.value), this.inputQuantidade.value, this.inputValor.value);
    }

    adiciona(event) {
        event.preventDefault();

        this.negociacoes.adiciona(this._criaNegociacao());
        console.log(this.negociacoes);
    }


}