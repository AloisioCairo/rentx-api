//	Capitulo 4 > Testes e regras de negócio > Carros > TDD na prática
//	Capitulo 4 > Testes e regras de negócio > Carros > Estruturando a entidade de carros   - Inclusão do typeorm
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    // Capítulo 4 > Testes e regras de negócio > Carros > Caso de uso do cadastro de especificação para carro
    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name: "car_id" }],
        inverseJoinColumns: [{ name: "specification_id" }]
    })
    specifications: Specification[];

    @CreateDateColumn()
    created_at: Date;

    //	Capitulo 4 > Testes e regras de negócio > Carros > Continuando o caso de uso de carros
    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}

export { Car }