// Capítulo 3 > Continuando a aplicação > Avatar do usuário > Adicionando coluna de avatar
// e Capítulo 3 > Continuando a aplicação > Avatar do usuário > upload do avatar
// e Capítulo 6 > Deploy > Configuração AWS > Provider de Upload
import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
    tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(16).toString("hex");

            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),

};