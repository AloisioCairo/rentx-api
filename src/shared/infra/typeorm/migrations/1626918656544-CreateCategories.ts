// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Criando migration de categoria
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1626918656544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Método utilizado para subir a migration
        await queryRunner.createTable(
            new Table({
                name: "categories",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Método utilizado para desfazer a migration
        await queryRunner.dropTable("categories");
    }

}
