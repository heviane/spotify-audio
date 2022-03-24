/* It's a utility, it doesn't keep state. So the methods must be static */

// Para as funções usamos o jest, pq é um objeto mock (validar se foi chamado, quais parms)
import {jest} from '@jest/globals';
// Para usar .pipe() deve ser um objeto do tipo stream do Node.js
import {Readable, Writable} from 'stream';

// Return data from req and res like Node.js would
// Objetivo: Testar a implementação do código, não precisamos saber o que retorna, mas entender a assinatura
export default class TestUtil {

    // Gerar dados, gerar um Readable stream a partir de um dado, simular a entrega de um dado sob demanda
    static generateReadableStream(data){
        return new Readable({
            read(){
                for(const item of data){
                    this.push(item); // push = enviar dados para o stream
                }
                this.push(null); // informa que terminou de ler o arquivo
            }
            /* --------- Como vai funcionar...Como o Node faz internamente --------- 
                recebe um arquivo (dado), 
                    le 10% e passa para frente, 
                    le mais 10% e passa para frente, 
                    e assim por diante, até terminar o arquivo...
            */
        });
    }
    // Consumir dados, função para saber quando chegou os dados
    static generateWriteableStream(onData){
        return new Writable({
            // chunk = Pedacinho do arquivo (os 10% do exemplo)
            write(chunk, encoding, callback){
                // A cada vez que chegar um chunk novo, chama a função onData
                // Pq aí consegue mandar uma função do jest para validar se foi chamado, qte vezes
                onData(chunk);
                // Informa que terminou o response e repassa o chunk
                callback(null, chunk); 
            }
        });
    }
    // Retornar dados para a função handler()
    static defaultHandleParams(){
        // Os args aqui não importam, pois não queremos usar de fato estes objetos, 
        // mas sim ter acesso aos métodos do objeto stream: .pipe(), .pause(), etc.
        const reqStream = TestUtil.generateReadableStream(['body of request']);
        const response = TestUtil.generateWriteableStream(() => {}); 
        // data = dados que serão retornados
        // Juntar os objetos para ter acesso aos métodos do stream:  .pipe(), .pause(), etc.
        const data = {
            // É a fonte de dados = Readable
            req: Object.assign(reqStream, {
                headers: {},
                method: '',
                url: '',
            }),
            // É a saida dos dados = Writable
            res: Object.assign(response, {
                writeHead: jest.fn(), 
                end: jest.fn(),
            }),
        }
        // handler(data.req, data.res)
        // handler(...data) // Posição 1 = req, Posição 2 = res
        // handler(...data.values()); // Retorna um array com os valores do objeto
        return {
            values: () => Object.values(data),
            ...data,
        }
    }
}
