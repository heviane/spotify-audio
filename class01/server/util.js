import pino from 'pino';

const log = pino({
    // Var ambiente para poder setar no package.json e assim desabilitar o log
    // Importante desabilitar quando for executar os testes, pois não precisamos deles
    enabled: !(!!process.env.LOG_DISABLED),
    //
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        }
    }
});

export const logger = log;
