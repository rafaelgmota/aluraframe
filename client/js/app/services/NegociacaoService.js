class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {

        return Promise.all([this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()])
            .then(periodos => {
                let negociacoes = periodos.reduce((arrayAchatado, array) => arrayAchatado.concat(array), []);
                return negociacoes;
            })
            .catch( erro => {
                throw new Error(erro);
            });
    }

    obterNegociacoesDaSemana() {

        return this._http.get('negociacoes/semana').
            then(negociacoes => {
                return negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));
            }).
            catch(erro => {
                console.log(erro);
                throw new Error('Falha na importação das negociações da semana atual');
            });
    }

    obterNegociacoesDaSemanaAnterior() {

        return this._http.get('negociacoes/anterior').
        then(negociacoes => {
            return negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));
        }).
        catch(erro => {
            console.log(erro);
            throw new Error('Falha na importação das negociações da semana anterior');
        });

    }

    obterNegociacoesDaSemanaRetrasada() {

        return this._http.get('negociacoes/retrasada').
        then(negociacoes => {
            return negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));
        }).
        catch(erro => {
            console.log(erro);
            throw new Error('Falha na importação das negociações da semana retrasada');
        });
    }
}