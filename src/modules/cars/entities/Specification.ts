// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando o service de especificação e separando em modulos
import { v4 as uuidV4 } from 'uuid';

class Specification {
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

export { Specification }