/* Layer: Business rule or processing (called by controller.js)
    Retorna arquivo como stream para o frontend com nome e tipo.*/
import fs from 'fs';
import fsPromises from 'fs/promises';
import {join, extname} from 'path';
import config from './config.js';

const {
    dir:{publicDir}
} = config;

export class Service {
    // Retorna o stream arquivo
    createFileStream(filename){
        return fs.createReadStream(filename)
    }
    // Retorna as informações do arquivo (tipo e path)
    async getFileInfo(file){
        // file = home/index.html <=> fulFilePath = public/home/index.html
        const fullFilePath = join(publicDir, file);
        // Valida se existe o arquivo, senão retorna erro
        await fsPromises.access(fullFilePath);
        // Pega a extensão do arquivo
        const fileType = extname(fullFilePath); 
        return {type: fileType, name: fullFilePath}
    }
    // Normaliza o arquivo e retorna o tipo de dado 
    // Frontend exige o tipo de dado em "content-type"
    async getFileStream(file){
        const {name,type} = await this.getFileInfo(file);
        return {stream: this.createFileStream(name), type}
    }
}
