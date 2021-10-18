// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Alterar tabela de usuário
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserDeleteUserName1627554771707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "username");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Excluir a coluna 'username'
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "name",
                type: "varchar",
            })
        );
    }

}
