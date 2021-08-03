// Capítulo 3 > Continuando a aplicação > Avatar do usuário > Adicionando coluna de avatar
// e Capítulo 3 > Continuando a aplicação > Avatar do usuário > upload do avatar
import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");

                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
        };
    },
};