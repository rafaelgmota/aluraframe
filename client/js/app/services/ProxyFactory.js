class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {
            //Quero interceptar funções, a chamada de funcoes primeiro faz um get e  depois um reflect
            get(target, prop, receiver) {

                //Verifica se a propriedade que esta sendo modifica é adiciona ou esvazia
                if(props.includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    //Substitui o get padrão
                    return function () {

                        console.log(`interceptando: ${prop}`);

                        //Chama a função original com os paramentros recebidos
                        //Executando no contexto do target
                        let retorno = Reflect.apply(target[prop], target, arguments);

                        //Chama o update de NegociacoesView, necessario o self
                        //O target é o que o proxy esta encapsulando, no caso ListaNegociacoes.
                        acao(target);

                        return retorno;
                    }
                }
                //Se não for as funções desejadas, faz o get padrão
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
              if(props.includes(prop)) {
                  console.log(`interceptando: ${prop}`);
                  acao(target);
              }

              return retorno;
            }
        });
    }
}