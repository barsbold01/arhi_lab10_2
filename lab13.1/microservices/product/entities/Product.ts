import { Column, Entity, ObjectIdColumn } from "typeorm";
import type { ObjectId } from "mongodb";

@Entity()
export class Product {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  price!: number;
}

