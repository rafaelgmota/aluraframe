class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);

        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
    }

    criaNegociacao() {
        console.log(this.inputData.value);
        let data = new Date(...
            this.inputData.value.split("-").
            map((item, idx) => item - idx % 2 ));

        return new Negociacao(data, this.inputQuantidade.value, this.inputValor.value);
    }

    adiciona(event) {
        event.preventDefault();

        this.criaNegociacao();
    }


}