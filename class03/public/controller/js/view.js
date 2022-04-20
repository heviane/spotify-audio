// Apresentação (telas)

export default class View {

    constructor(){
        this.btnStart = document.getElementById('start')
        this.btnStop = document.getElementById('stop')

        async function onBtnClick(){}
        this.onBtnClick = onBtnClick
    }

    // Sempre bom criar essa função para executar algo qdo inicializar a tela
    onLoad(){
        this.changeCommandBtnsVisibility();
        // bind(this) para ele guardar o contexto
        this.btnStart.onclick = this.onStartClicked.bind(this)
    }

    changeCommandBtnsVisibility(hide=true){
        // retorna um tipo map (NodeList) do browser, ai convertemos para um array
        Array.from(document.querySelectorAll('[name=command]'))
        .forEach( btn => {
            const fn = hide ? 'add' : 'remove'
            btn.classList[fn]('unassigned')
            // toda vez que mudar a visibilidade, zerar o onClick
            function onClickReset(){}
            btn.onclick = onClickReset
        })
    }

    configureOnBtnClick(fn){
        this.onBtnClick = fn
    }

    // Evento configurado para quando clicarem no botão de inicializar
    // A controller não tem conhecimento sobre o que a view tem
        // Aqui ela só vai saber que tem que passar um texto
    async onStartClicked({srcElement:{innerText}}){
        const btnText = innerText
        console.log({btnText})  // {btnText: 'Start Stream'}
                                // btnText: "Start Stream"[[Prototype]]: Object
        await this.onBtnClick(btnText)
    }
}
