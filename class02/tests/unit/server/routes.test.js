import {
    jest,
    expect, 
    describe, 
    test, 
    beforeEach, // Clean everything before each test
} from '@jest/globals';
import config from '../../../server/config.js';
import {Controller} from '../../../server/controller.js';
import {handler} from '../../../server/routes.js';
import TestUtil from '../_util/testUtil.js';

const { pages, location, constants: { CONTENT_TYPE } } = config;

// Describe test responsibility
describe('Routes - Test suíte for api response', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test('Test the suites before implementing the tests', () => { 
        expect(true).toBeTruthy(); // true = passed and false = failed
    });
    /*---------------- Test planning with todo() ----------------*/
        // // We are always working with stream, not string and text
        // test.todo('GET / - Should redirect to home page');
        // test.todo(`GET /home - Should response with ${pages.homeHTML} file stream`);
        // test.todo(`GET /controller - Should response with ${pages.controllerHTML} file stream`);
        // // files, pode ser qualquer extensão. Aqui é teste unitário, não vai chamar stream
        // test.todo(`GET /file.ext - Should response with file stream`);
        // test.todo(`GET /unknown - Given an inexistent route it should response with 404`);
        // describe('Exceptions', () => {
        //     test.todo('Given an inexistent file it should response with 404');
        //     test.todo('Given an error file it should respone with 500');
        // });
    
    /*---------------- Test implementation ----------------*/
        // Não manipulamos streams pq este endpoint apenas redireciona
        test('GET / - Should redirect to home page', async () => {
            const parms = TestUtil.defaultHandleParams();
            parms.req.method ='GET';
            parms.req.url = '/';
            //// Não precisa, pois já foi definido como um objeto jest no testUtils.js
            // jest.spyOn(
            //     parms.res,
            //     parms.res.writeHead.name, // aqui precisa de uma string
            // ).mockReturnValue();
            await handler(...parms.values());
            expect(parms.res.writeHead).toBeCalledWith(302,{'Location': location.home});
            expect(parms.res.end).toHaveBeenCalled();
        });
        // Valida se foi retornado um stream, se foi chamado com o pipe() e pelo home
        test(`GET /home - Should response with ${pages.homeHTML} file stream`, async () => {
            const parms = TestUtil.defaultHandleParams();
            parms.req.method ='GET';
            parms.req.url = '/home';
            /*
                Esperamos um file stream, mas por ser teste unitário, não podemos acessar o SO.
                Interceptar o q esta função deveria fazer (ir no SO verificar se o arquivo existe) 
                    e aí assim retornar o valor (só validamos que ele vai retornar uma stream).
                Assim, validamos o comportamento:
                    - As rotas estão chamando os dados independente das suas dependências.
                    - Se a service modificar a sua implementação de fundo, vamos garantir que
                    sempre retorne o objeto stream.
            */
            // Passamos qualquer coisa no parm, pois queremos apenas o objeto stream, q é retornado
            const mockFileStream = TestUtil.generateReadableStream(['data']); 
            jest.spyOn(
                Controller.prototype,
                Controller.prototype.getFileStream.name, // Precisa do nome da função
            ).mockResolvedValue({
                stream: mockFileStream, // objeto stream
                type: ''
            })
            // Validar que o stream foi chamado com .pipe()
                // Qdo chamar o pipe() damos apenas um return
                // Não vai chamar o pipe() de verdade, vamos apenas mockar ele
            jest.spyOn(
                mockFileStream,
                "pipe", //mockFileStream.pipe.name, ** Esta função não tem name **
            ).mockReturnValue();

            await handler(...parms.values());

            // Validar se o stream foi chamado com o home
            expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHTML); // Passed
            // expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHTML+'1'); // Failed

            expect(mockFileStream.pipe).toHaveBeenCalledWith(parms.res);
            // expect(parms.res.end).toHaveBeenCalled(); // Neste caso, não vai ser chamado...
        });
        // Valida se foi retornado um stream, se foi chamado com o pipe() e pelo controller
        test(`GET /controller - Should response with ${pages.controllerHTML} file stream`, async () => {
            const parms = TestUtil.defaultHandleParams();
            parms.req.method ='GET';
            parms.req.url = '/controller';
            const mockFileStream = TestUtil.generateReadableStream(['data']); 
            jest.spyOn(
                Controller.prototype,
                Controller.prototype.getFileStream.name, // Precisa do nome da função
            ).mockResolvedValue({
                stream: mockFileStream, // objeto stream
                type: ''
            })
            jest.spyOn(
                mockFileStream,
                "pipe", //mockFileStream.pipe.name, ** Esta função não tem name **
            ).mockReturnValue();
            await handler(...parms.values());
            expect(Controller.prototype.getFileStream).toBeCalledWith(pages.controllerHTML); // Passed
            //expect(Controller.prototype.getFileStream).toBeCalledWith(pages.controllerHTML+'1'); // Failed
            expect(mockFileStream.pipe).toHaveBeenCalledWith(parms.res);
        });

        /* Para o static files são 2 testes: um que bate no if e outro que não bate no if */

        // static files que bate no if (enviado type)
        // Valida se foi retornado um stream, se foi chamado com o pipe(), e o tipo de arquivo
        test(`GET /index.html - Should response with file stream`, async () => {
            const parms = TestUtil.defaultHandleParams();
            const filename = '/index.html'; // Pega o path, por isso precisa da barra 
            parms.req.method ='GET';
            parms.req.url = filename;
            const expectedType = '.html';
            const mockFileStream = TestUtil.generateReadableStream(['data']); 
            jest.spyOn(
                Controller.prototype,
                Controller.prototype.getFileStream.name, // Precisa do nome da função
            ).mockResolvedValue({
                stream: mockFileStream, // objeto stream
                type: expectedType
            })
            jest.spyOn(
                mockFileStream,
                "pipe", //mockFileStream.pipe.name, ** Esta função não tem name **
            ).mockReturnValue();
            await handler(...parms.values());
            expect(Controller.prototype.getFileStream).toBeCalledWith(filename); // Passed
            //expect(Controller.prototype.getFileStream).toBeCalledWith(filename+'1'); // Failed
            expect(mockFileStream.pipe).toHaveBeenCalledWith(parms.res);
            // O type que vier tem que ser igual a um dos que estiver no config
            expect(parms.res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': CONTENT_TYPE[expectedType]});
        });
        // static files que NÃO bate no if (sem type)
        test(`GET /file.ext - Should response with file stream`, async () => {
            const parms = TestUtil.defaultHandleParams();
            const filename = '/file.ext'; 
            parms.req.method ='GET';
            parms.req.url = filename;
            const expectedType = '.ext';
            const mockFileStream = TestUtil.generateReadableStream(['data']); 
            jest.spyOn(
                Controller.prototype,
                Controller.prototype.getFileStream.name, // Precisa do nome da função
            ).mockResolvedValue({
                stream: mockFileStream, // objeto stream
                type: expectedType
            })
            jest.spyOn(
                mockFileStream,
                "pipe", //mockFileStream.pipe.name, ** Esta função não tem name **
            ).mockReturnValue();
            await handler(...parms.values());
            expect(Controller.prototype.getFileStream).toBeCalledWith(filename); // Passed
            //expect(Controller.prototype.getFileStream).toBeCalledWith(filename+'1'); // Failed
            expect(mockFileStream.pipe).toHaveBeenCalledWith(parms.res);
            // Não vai ser chamado porque não tem o content-type
            expect(parms.res.writeHead).not.toHaveBeenCalled();
        });
        // Valida quando recurso não é encontrado (404)
        test(`POST /unknown - Given an inexistent route it should response with 404`, async () => {
            const parms = TestUtil.defaultHandleParams();
            parms.req.method ='POST';
            parms.req.url = '/unknown';
            const mockFileStream = TestUtil.generateReadableStream(['data']); 
            
            await handler(...parms.values());
            expect(parms.res.writeHead).toHaveBeenCalledWith(404);
            expect(parms.res.end).toHaveBeenCalled();
        });

        describe('Exceptions', () => {
            // A rota tem que ser existente, mas o file não pode existir
            // A service vai estourar um error em fsPromises.access()
            // Esperado que o getFileInfo rejeite o resultado
            test('Given an inexistent file it should response with 404', async () => {
                const parms = TestUtil.defaultHandleParams();
                parms.req.method ='GET';
                parms.req.url = '/teste.png';
                const mockFileStream = TestUtil.generateReadableStream(['data']); 
                // mock = function handleError() = Primeiro if = if(error.message.includes('ENOENT'))
                jest.spyOn(
                    Controller.prototype,
                    Controller.prototype.getFileStream.name, // Precisa do nome da função
                // Ele vai rejeitar e dar um erro    
                ).mockRejectedValue(new Error('Error: ENOENT: no such file or directory, open \'teste.png\''));
                
                await handler(...parms.values());
                expect(parms.res.writeHead).toHaveBeenCalledWith(404);
                expect(parms.res.end).toHaveBeenCalled();
            });
            // 
            test('Given an error file it should respone with 500', async () => {
                const parms = TestUtil.defaultHandleParams();
                parms.req.method ='GET';
                parms.req.url = '/teste.png';
                const mockFileStream = TestUtil.generateReadableStream(['data']); 
                // mock = function handleError() = Não cai no if do erro 404
                jest.spyOn(
                    Controller.prototype,
                    Controller.prototype.getFileStream.name, // Precisa do nome da função
                // Ele vai rejeitar qualquer coisa  
                ).mockRejectedValue(new Error('Error:'));
                
                await handler(...parms.values());
                expect(parms.res.writeHead).toHaveBeenCalledWith(500);
                expect(parms.res.end).toHaveBeenCalled();
            });
        });
});
