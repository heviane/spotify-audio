import {jest, describe, test, expect, beforeEach} from '@jest/globals';
import {JSDOM} from 'jsdom'; // API p/ simular o browser
import View from './../../../public/controller/js/view.js';

describe('#view - test suite for presentation layer', () => {

    const dom = new JSDOM();
    global.document = dom.window.document;
    global.window   = dom.window;

    // botão mockado
    // text é o nome do comando do botão
    function makeBtnElement({text, classList}={text:'', classList:{add: jest.fn(), remove: jest.fn()}}){
        // retornar como se fosse um botão do browser
        return {
            onClick: jest.fn(),
            classList,
            innerText: text
        }
    }

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
        jest.spyOn(document, 'getElementById').mockReturnValue(makeBtnElement());
    });

    // true = passed or false = failed
    test.skip('Test the suites before implementing the tests', () => {expect(true).toBeTruthy()});

    // // Planejamento
    // test.todo('#changeCommandBtnsVisibility - given hide = true it should add unassigned class and reset onclick');
    // test.todo('#changeCommandBtnsVisibility - given hide = false it should remove unassigned class and reset onclick');
    // test.todo('#onLoad');
    // // Planejamento

    test('#changeCommandBtnsVisibility - given hide = true it should add unassigned class and reset onclick', () => {
        // Não deveria chamar view p controller? NO, pq é teste unitário, e sempre deve ser individual
        const view = new View(); 
        const btn = makeBtnElement();
        jest.spyOn(document, document.querySelectorAll.name).mockReturnValue([btn]);
        view.changeCommandBtnsVisibility();//true já está como default arguments

        // valida a classe add quando for true
        expect(btn.classList.add).toHaveBeenCalledWith('unassigned');
        // valida o nome da função chamada
        expect(btn.onclick.name).toStrictEqual('onClickReset');
        // validar que é realmente uma função para que não estoure uma exceção
        // teste para poder cobrir 100% coverage
        expect(() => btn.onclick()).not.toThrow();
    });

    test('#changeCommandBtnsVisibility - given hide = false it should remove unassigned class and reset onclick', () => {
        const view = new View(); 
        const btn = makeBtnElement();
        jest.spyOn(document, document.querySelectorAll.name).mockReturnValue([btn]);
        
        view.changeCommandBtnsVisibility(false);

        expect(btn.classList.add).not.toHaveBeenCalled();
        expect(btn.classList.remove).toHaveBeenCalledWith('unassigned');
        expect(btn.onclick.name).toStrictEqual('onClickReset');
        expect(() => btn.onclick()).not.toThrow();
    });

    test('#onLoad', () => {
        const view = new View();
        jest.spyOn(view, view.changeCommandBtnsVisibility.name).mockReturnValue();
        view.onLoad();
        expect(view.changeCommandBtnsVisibility).toHaveBeenCalled();
    });
});
