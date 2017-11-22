class NegociacaoService {

    obterNegociacoesDaSemana(cb) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {

            //Sucesso na comunicacao com o servidor e retorno válido
            if(xhr.readyState == 4) {

                //Status retornado foi sucesso
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText).map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)));
                }
                else {
                    console.log(xhr.responseText);
                    cb("Ocorreu um erro ao importar as negocicacoes", null);
                }
            }
        }

        xhr.send();

    }
}