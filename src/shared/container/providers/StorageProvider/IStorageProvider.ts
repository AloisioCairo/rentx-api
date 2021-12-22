// Capítulo 6 > Deploy > Configuração AWS > Provider de Upload
interface IStorageProvider {
    save(file: string, folder: string): Promise<string>;
    delete(file: string, folder: string): Promise<void>;
}

export { IStorageProvider }