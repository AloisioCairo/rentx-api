// Capitulo 2 > Iniciando a API > Trabalhando com upload  > Criando use case para importar categorias
import fs from "fs"; // Capitulo 2 > Iniciando a API > Trabalhando com upload  > Conhecendo o conceito de stream
import csvParse from "csv-parse";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

// Capitulo 2 > Iniciando a API > Trabalhando com upload  > Lendo os dados do upload
interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            // Para a biblioteca "csvparse" o delimitador padrão do arquivo .csv já é a , (virgula)
            const parseFile = csvParse();

            stream.pipe(parseFile);

            // Capitulo 2 > Iniciando a API > Trabalhando com upload  > Lendo os dados do upload
            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        // Capitulo 2 > Iniciando a API > Trabalhando com upload  > Inserindo os dados do upload no repositório
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };