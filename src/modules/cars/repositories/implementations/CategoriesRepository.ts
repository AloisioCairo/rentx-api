// 1.	Capitulo 2 > Iniciando a API > Criando a API com NodeJS  > Criando repositóorio de categoria
// import { categoriesRoutes } from "routes/categories.routes";
import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {

    // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Alterando o repositório de categoria
    private repository: Repository<Category>;

    // 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Conhecendo Singleton Parttern
    private static INSTANCE: CategoriesRepository;

    constructor() {
        // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Alterando o repositório de categoria
        this.repository = getRepository(Category);
    }

    // // 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Conhecendo Singleton Parttern
    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }

    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Alterando o repositório de categoria
        const category = this.repository.create({
            name,
            description,
        })

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Alterando o repositório de categoria
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Alterando o repositório de categoria
        const category = await this.repository.findOne({ name });

        return category;
    }
}

export { CategoriesRepository }