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
import { jest, expect, describe, test } from '@jest/globals';
import Server from '../../../server/server.js'
import superTest from 'supertest'
import portfinder from 'portfinder'
import { Transform } from 'stream'
import { setTimeout } from 'timers/promises'

const getAvailablePort = portfinder.getPortPromise
const RETENTION_DATA_PERIOD = 200

describe('API E2E Suite Test', () => {
    const commandResponse = JSON.stringify({ result: 'ok' })
    const possibleCommands = { start: 'start', stop: 'stop' }

    // Criar um dado do tipo stream
    function pipeAndReadStreamData(stream, onChunk) {
        const transform = new Transform({
            transform(chunk, enc, cb) {
                onChunk(chunk)
                cb(null, chunk)
            }
        })
        return stream.pipe(transform)
    }
    describe('client workflow', () => {
        // Instanciar um servidor
        async function getTestServer() {
            const getSupertTest = port => superTest(`http://localhost:${port}`)
            const port = await getAvailablePort()
            return new Promise((resolve, reject) => {
                const server = Server.listen(port)
                    .once('listening', () => {
                        const testServer = getSupertTest(port)
                        const response = {
                            testServer,
                            kill() { server.close() }
                        }
                        return resolve(response)
                    })
                    .once('error', reject)
            })
        }
        // Cada comando enviado vai ser para um teste especifico
            // Poderia abstratir para o utils...???
        function commandSender(testServer) {
            return {
                async send(command) {
                    const response = await testServer.post('/controller')
                        .send({ command })
                    // como essa função vai ser usada para todo lado...já da expect() aqui
                    expect(response.text).toStrictEqual(commandResponse)
                }
            }
        }
        test('it should not receive data stream if the process is not playing', async () => {
            // Server inicializado
            const server = await getTestServer()
            const onChunk = jest.fn()
            // Escutando a rota /stream e nunca recebendo dado
            pipeAndReadStreamData(
                server.testServer.get('/stream'), // Server executar rota /stream
                onChunk // Função que será chamada para cada chunk recebido
            )
            // Aguardar 200 milisegundos para dar tempo do server iniciar
            await setTimeout(RETENTION_DATA_PERIOD)
            // Matar o server
            server.kill()
            // Esperado que a função onChunk não tenha sido chamada, pq nenhum chunk foi recebido
            expect(onChunk).not.toHaveBeenCalled()
        })
        test('it should receive data stream if the process is playing', async () => {
            const server = await getTestServer()
            const onChunk = jest.fn()
            const { send } = commandSender(server.testServer)
            pipeAndReadStreamData(
                server.testServer.get('/stream'),
                onChunk
            )
            await send(possibleCommands.start)
            await setTimeout(RETENTION_DATA_PERIOD)
            await send(possibleCommands.stop)
            const [ [buffer] ] = onChunk.mock.calls
            expect(buffer).toBeInstanceOf(Buffer)
            expect(buffer.length).toBeGreaterThan(1000)
            server.kill()
        })
    })
})
