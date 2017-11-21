class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        let self = this;

        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");

        //Aplicar proxy
        this._negociacoes = new Proxy(new ListaNegociacoes(), {
            //Quero interceptar funções, a chamada de funcoes primeiro faz um get e  depois um reflect
           get(target, prop, receiver) {
               console.log(typeof(prop));

                //Verifica se a propriedade que esta sendo modifica é adiciona ou esvazia
               if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                   //Substitui o get padrão
                   return function () {

                       console.log(`interceptando: ${prop}`);

                       //Chama a função original com os paramentros recebidos
                       Reflect.apply(target[prop], target, arguments);

                       //Chama o update de NegociacoesView, necessario o self
                       //O target é o que o proxy esta encapsulando, no caso ListaNegociacoes.
                       self._negociacoesView.update(target);
                   }
               }
               //Se não for as funções desejadas, faz o get padrão
               return Reflect.get(target, prop, receiver);
           }
        });

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