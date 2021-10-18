// 1.	Capitulo 2 > Iniciando a API > Criando a API com NodeJS  > Inserindo tipagem para categoria
import { v4 as uuidV4 } from 'uuid';
// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Refatorando o model de categoria
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity("categories")
class Category {
    @PrimaryColumn()
    id?: String;

    @Column()
    name: String;

    @Column()
    description: String;

    @CreateDateColumn() // O typeorm tem uma anotação do tipo "created_at" que na inserção já insere com a data atual
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category }