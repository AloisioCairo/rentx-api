// 1.	Capitulo 2 > Iniciando a API > Criando a API com NodeJS  > Inserindo tipagem para categoria
import { v4 as uuidV4 } from 'uuid';

class Category {
    id?: String;
    name: String;
    description: String;
    created_at: String;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category }