import { Column, Entity, ObjectIdColumn } from "typeorm";
import type { ObjectId } from "mongodb";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}

