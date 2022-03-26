import {jest, expect, describe, test, beforeEach} from '@jest/globals';
/* ---------- supertest para testar request da API
    Ideal seria q toda vez que fosse chamado instancia-se um novo server
        Porque os testes devem ser isolados, ou seja,
        Ao rodar vários testes em paralelo, um teste não pode sujar o ambiente do outro teste
        Erick não achou na docs...
    Como vai funcionar?
        Instanciar o supertest passando uma url
            Isso significa que:
                Vamos subir server primeiro e depois passar para o supertest 
                Supertest nao vai instanciar porta nenhuma
                Assim precisa ver quais portas estão livres no container do docker => lib portfinder
*/
import superTest from 'supertest';
import portfinder from 'portfinder';
import config from '../../../server/config.js';
import Server from '../../../server/server.js';

const getAvailablePort = portfinder.getPortPromise

describe('API E2E Suíte Test', () => {
    describe('Client workflow', () => {

        // Get an available port on the server
        // Chamar em todo teste, assim um teste não suja o ambiente do outro
        async function getTestServer(){
            const getSuperTest = port => `http://localhost:${port}`;
            const port = await getAvailablePort();
            return new Promise( (resolve, reject) => {
                const server = Server.listen(port)
                .once('listening', () => {
                    const testServer = getSuperTest(port);
                    const response = {
                        testServer,
                        kill(){ return server.close() }
                    }
                    return resolve(response);
                })
                .once('error', reject());
            });
        }

        test.todo('it should not receive data stream if the process is not playing');
        test.todo('it should receive data stream if the process is playing');

    })
})
