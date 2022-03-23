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

const { pages, location } = config;

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
        // Aqui não manipulamos streams pq este endpoint apenas redireciona
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
        // Aqui validamos se foi retornado um stream, se foi chamado com o pipe() e pelo home
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
});
