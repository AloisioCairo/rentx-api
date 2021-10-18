// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando o service de especificação e separando em modulos
import { v4 as uuidV4 } from 'uuid';

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity("specifications")
class Specification {
    @PrimaryColumn()
    id?: String;

    @Column()
    name: String;

    @Column()
    description: String;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Specification }