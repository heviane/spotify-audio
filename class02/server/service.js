/* Layer: Business rule or processing (called by controller.js)
    Retorna arquivo como stream para o frontend com nome e tipo.*/
// ----------- Módulos internos do Node
import fs from 'fs';
import fsPromises from 'fs/promises';
import {join, extname} from 'path';
import {randomUUID} from 'crypto';
// Uma stream chega, passa por ele, e vai para o próximo. Como uma corrente. Sem nenhuma alteração.
// O backend passa para ele o stream e ele passa para o browser. É um canal de comunicação.
import {PassThrough,Writable} from 'stream'; 
import streamPromise from 'stream/promises';
import {once} from 'events';
// Server para executar comandos do SO.
import childProcess from 'child_process';
// ----------- Libs installed
// Lib p controlar o fluxo, quantidade de bytes a ser enviada p o cliente final.
import Throttle from 'throttle';
// ----------- Imports locais
import config from './config.js';
import {logger} from './util.js';

const {
    dir:{publicDir},
    constants: {fallBackBitRate, englishConversation, bitRateDivisor}
} = config;

export class Service {

    // Cada cliente q acessar recebe o cano (vazio) por onde vai passar a água (streams)
    // Inicializa vazio, deixa clt consumindo, a medida q audio estiver pronto vai enviando
    // Estabilizar esse canal de comunicação
    constructor(){
        this.clientStreans = new Map();
        this.currentSong = englishConversation;
        this.currentBitRate = 0;
        this.throttleTransform = {};
        this.currentReadable = {};

        // temporário
        // assim q alguém der new no Service já inicializamos p verificar se está funcionando
        this.startStream();
    }
    createClientStream(){
        const id = randomUUID();
        const clientStream = new PassThrough();
        this.clientStreans.set(id, clientStream);
        return {id, clientStream}
    }
    removeClientStream(id){
        this.clientStreans.delete(id);
    }
    // Basicamente, é uma abstração aqui
    // underline ( _ ) é uma convenção para uma função privada
    // Poderia ser hashtag ( # ), mas nos testes o coverage se perde
    _executeSoxCommand(args){
        return childProcess.spawn('sox', args); // docs/sox-commands.md
    };
    // Retorna o Bit Rate (Taxa de bits por segundo que pode ser transmitida via rede) do arquivo
    async getBitRate(file){
        try {
            // Definindo os comandos a serem enviados para o SO
            const args = [
                '--i', // info 
                '-B',  // bite rate
                file   // file name
            ];
            // Enviando os comandos para o SO (temos 3 objetos)
            const {
                stderr, // stream para tudo que é erro
                stdout, // stream para tudo que é sucessos, tudo que é log
                //stdin // stream para enviar dados para o comando
            } = this._executeSoxCommand(args);

            // // método read() serve para ler streams
            // const sucess = stderr.read(); // ler tudo que está no stderr
            // const error = stdout.read();  // ler tudo que está no stdout

            // Esperar todas as promises serem resolvidas
            await Promise.all([ 
                once(stderr, 'readable'), // quando o stderr estiver pronto/disponível
                once(stdout, 'readable'), // quando o stdout estiver pronto/disponível
            ]); 

            // Fazer map() p executar read() para cada stream retornada da execução pelo SO
            const [success, error] = [stdout, stderr].map(stream => stream.read()); 
            // success = Buffer
            // success.toString() = 128k
            
            // Usando await p cair no catch, caso contrário, iria cair no catch da camada de rotas
            if(error) return await Promise.reject(error);

            // O comando retorna 128K, temos que transformar em mil (K sempre representa 1000)
            return success
            .toString() // Converter p string q trabalha com Buffer q é um outro tipo de objeto
            .trim() // Remover todos os espaços
            // .replace('k', '000') // Substituir K por 000
            .replace(/k/, '000')    // Substituir K por 000 *** com expressão regular ***
        } catch(error){
            logger.error(`Deu ruim no BiteRate: ${error}`);
            return fallBackBitRate;
        }
    }

    broadcast(){
        return new Writable({
            // Passar arrow function para herdar o contexto
            write: (chunk, encoding, callback) => {
                // for porque é um tipo Map()
                for(const [index, stream] of this.clientStreans){
                    // Se stream quebrar. Ex: cliente desconectou, não vai mais receber dados
                    if(stream.WritableEnded){
                        this.clientStreans.delete(index);
                        continue; // volta para o for
                    }
                    stream.write(chunk); // Notifica cada cliente a cada pedacinho que chegar
                }
                callback();
            }
        });
    }
    /* Com a info de bitRate podemos ver o quanto vai ser enviado para o cliente */
    async startStream(){
        // Inicializar a stream
        logger.info(`starting with ${this.currentSong}`);
        // 128k é muito grande, então dividimos  
        const bitRate = this.currentBitRate = (await this.getBitRate(this.currentSong)) / bitRateDivisor;
        // Responsável por controlar o fluxo 
        const throttleTransform = new Throttle(bitRate);
        // Cria como stream
        // Aí pode usar pipe(), a medida q processa vai enviando p todos q estiverem escutando (clientStream)
        const songReadable = this.currentReadable = this.createFileStream(this.currentSong);
        // Neste caso, queremos ler a stream até o final
        // Queremos que a medida que o dado chegue, mande ele para frente
        return streamPromise.pipeline(
            songReadable, // stream de entrada
            throttleTransform, // controla o fluxo
            // A media q o throttleTransform deixou passar p frente, vamos notificar todos clientes
            this.broadcast(), // stream de saída
        );
    }

    // Retorna o stream arquivo
    createFileStream(filename){
        return fs.createReadStream(filename)
    }
    // Retorna as informações do arquivo (type and path)
    async getFileInfo(file){
        // file = home/index.html <=> fulFilePath = public/home/index.html
        const fullFilePath = join(publicDir, file);
        // Valida se existe o arquivo, senão retorna erro
        await fsPromises.access(fullFilePath);
        // Pega a extensão do arquivo
        const fileType = extname(fullFilePath); 
        return {type: fileType, name: fullFilePath}
    }
    // Normaliza file e retorna tipo de dado (Frontend exige o tipo de dado em "content-type")
    async getFileStream(file){
        const {name,type} = await this.getFileInfo(file);
        return {stream: this.createFileStream(name), type}
    }
}
