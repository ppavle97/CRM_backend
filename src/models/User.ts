import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import bcrypt from "bcryptjs";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 25 })
  @Length(5, 25)
  fullName!: string;

  @Column({ unique: true, length: 255 })
  @IsEmail()
  email!: string;

  @Column({ length: 100 })
  password!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      if (!this.isPasswordValid()) {
        throw new Error("Password does not meet requirements");
      }
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  private isPasswordValid(): boolean {
    return (
      this.password.length >= 8 &&
      /[a-zA-Z]/.test(this.password) &&
      /\d/.test(this.password)
    );
  }
}
