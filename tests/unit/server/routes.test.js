import {
    jest,
    expect, 
    describe, 
    test, 
    beforeEach, // Clean everything before each test
} from '@jest/globals';

import config from '../../../server/config.js';
const { pages } = config;

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
        // We are always working with stream, not string and text
        test.todo('GET / - Should redirect to home page');
        test.todo(`GET /home - Should response with ${pages.homeHTML} file stream`);
        test.todo(`GET /controller - Should response with ${pages.controllerHTML} file stream`);
        // files, pode ser qualquer extensão. Aqui é teste unitário, não vai chamar stream
        test.todo(`GET /file.ext - Should response with file stream`);
        test.todo(`GET /unknown - Given an inexistent route it should response with 404`);
        describe('Exceptions', () => {
            test.todo('Given an inexistent file it should response with 404');
            test.todo('Given an error file it should respone with 500');
        });
});
