/* Layer: Intermediate presentation (routes.js) and business (service.js)
    Tem a responsabilidade de receber os eventos de um lado e chamar o próximo */
import {Service} from './service.js';
import {logger} from "./util.js";

export class Controller {
    // In the Constructor, create the service
    // There are better ways to do this, but for now, this is the best way
    constructor(){
        this.service = new Service();
    }
    // We will just pass the file stream to the frontend
    async getFileStream(filename){
        return this.service.getFileStream(filename);
    }
    createClientStream(){
        // Pegamos da service.js, próximo rota é routes.js
        const {id, clientStream} = this.service.createClientStream();
        const onClose = () => {
            logger.info(`Closing connection of ${id}`);
            this.service.removeClientStream(id);
        };
        return {
            stream: clientStream,
            onClose
        }
    }
}
