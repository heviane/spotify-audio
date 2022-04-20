// Regras de Negócio
export default class Service {
    constructor({url}){
        this.url = url;//url do backend
    }

    // request normal usando o fetch do navegador, não tem nada haver com node.js
    async makeRequest(data){
        const result = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return result.json()
    }
}
