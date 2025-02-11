/* Layer: Intermediate presentation (routes.js) and business (service.js)*/
import {Service} from './service.js';

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
}
