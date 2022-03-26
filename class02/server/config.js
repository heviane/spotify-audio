/*
    - Auxiliar em como a API vai chamar os dados do frontend
    - Primeiro normalizar:
        - Em que pasta estamos para poder chegar até a public.
    - Ao usar ECMAScript Module ("type":"module"):
        __dirname e __filename não existem mais, foram removidos.
    "import.meta.url" retorna a url do arquivo em que estamos.
        Ex: server/config.js
    Precisamos transformar essa url em um path.

    Se precisar mudar o nome de alguma pasta, muda em um lugar somente e não corre o risco de quebrar a app inteira.
*/

// Normalizar tudo neste arquivo para facilitar depois...
import {join,dirname} from 'path';
import {fileURLToPath} from 'url';

// Transform url into path but only directory name
// currenteDir vai ser o __dirname do arquivo que estamos
const currenteDir = dirname(fileURLToPath(import.meta.url)); // server
const root  = join(currenteDir, '../'); // pasta raiz do projeto
const audioDir  = join(root, 'audio');  // pasta de audio
const publicDir = join(root, 'public'); // pasta de public
const songsDir = join(audioDir, 'songs'); // pasta dos audios

// expor
export default {
    port: process.env.PORT || 3000,
    dir: {
        root,
        publicDir,
        audioDir,
        songsDir: songsDir,// audio/songs
        fxDir: join(audioDir, 'fx'), // audio/fx
    },
    // Não normalizado para pegar de forma dinâmica sem dificuldade
    // frontend sempre vai partir de public
    pages: {
        homeHTML: 'home/index.html',
        controllerHTML: 'controller/index.html',
    },
    // Para quando bater em "/" direcionar para home
    location:{
        home: '/home',
    },
    constants: {
      CONTENT_TYPE: {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
      },
      audioMediaType: 'mp3',
      songVolume: '0.99',
      fallBackBitRate: '128000', // 128k 
      bitRateDivisor: 8, // 8 bits
      englishConversation: join(songsDir, 'conversation.mp3'),
    }
};
