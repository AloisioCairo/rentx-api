// Capítulo 6 > Deploy > Configuração AWS > Upload utilizando S3
import { S3 } from "aws-sdk";
import { resolve } from "path";
import fs from "fs";
import mime from "mime";

import { IStorageProvider } from "../IStorageProvider";
import upload from "@config/upload";

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        const ContentType = mime.getType(originalName);

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType // Propriedade para informar que é para ao clicar na imagem o usuário visualizá-la e não fazer o download (necessário inst. biblioteca mime)
        }).promise();

        // Remove o arquivo de dentro da pasta tmp
        await fs.promises.unlink(originalName);

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        // Remover o arquivo de dentro do S3
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise();
    }
}

export { S3StorageProvider }