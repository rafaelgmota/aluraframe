class DateHelper {
    constructor() {
        throw new Error('A classa não necessita ser instanciada');
    }
    static textoParaData(texto) {
        return new Date(...texto.split("-").map((item, idx) => item - idx % 2 ));
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
    }
}