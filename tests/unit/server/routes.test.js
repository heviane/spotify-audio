import {
    jest,
    expect, 
    describe, 
    test, 
    beforeEach, // Clean everything before each test
} from '@jest/globals';
import config from '../../../server/config.js';
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
});
