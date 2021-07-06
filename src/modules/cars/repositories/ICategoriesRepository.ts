// 1. Capitulo 2 > Iniciando a API > S.O.L.I.D > Utilizando princípio da substituição de Liskov (LSP)
import { Category } from "../model/category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };