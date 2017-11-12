class Mensagem {
    constructor(texto="") { //Construtor com valor padrão
        this._texto = texto;
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        this._texto = texto;
    }
}