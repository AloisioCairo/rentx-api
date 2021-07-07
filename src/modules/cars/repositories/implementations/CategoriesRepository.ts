// 1.	Capitulo 2 > Iniciando a API > Criando a API com NodeJS  > Criando repositóorio de categoria
import { categoriesRoutes } from "routes/categories.routes";
import { Category } from "../../model/category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    // 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Conhecendo Singleton Parttern
    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }

    // 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Conhecendo Singleton Parttern
    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

    create({ description, name }: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
}

export { CategoriesRepository }