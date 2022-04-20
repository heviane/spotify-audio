// Controla a apresentação (as views)

export default class Controller {

    // Padrão conhecido como "INJEÇÃO DE DEPENDÊNCIAS"
        // Enviar via contrutor o que precisa
    constructor({view, service}) {
        this.view = view;
        this.service = service;
    }

    static initialize(dependencies){
        const controller = new Controller(dependencies)
        controller.onLoad()
        return controller
    }

    async commandReceived(text){
        console.log('controller', text) // controller Start Stream
        return this.service.makeRequest({
            command: text
        })
    }

    onLoad(){
        // bind para saber que é o this da controller e não da tela
        this.view.configureOnBtnClick(this.commandReceived.bind(this))
        this.view.onLoad()
    }
}
