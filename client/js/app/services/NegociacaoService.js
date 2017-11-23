class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return new Promise( (resolve, reject) => {

            this._http.get('negociacoes/semana').
                then(negociacoes => {
                    resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)));
                }).
                catch(erro => {
                    console.log(erro);
                    reject('Falha na importação das negociações da semana atual');
                });
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise( (resolve, reject) => {

            this._http.get('negociacoes/anterior').
            then(negociacoes => {
                resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)));
            }).
            catch(erro => {
                console.log(erro);
                reject('Falha na importação das negociações da semana anterior');
            });
        });

    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise( (resolve, reject) => {

            this._http.get('negociacoes/retrasada').
            then(negociacoes => {
                resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)));
            }).
            catch(erro => {
                console.log(erro);
                reject('Falha na importação das negociações da semana retrasada');
            });
        });
    }
}