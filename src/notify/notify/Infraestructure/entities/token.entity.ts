/*import { User } from 'src/user/domain/user';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne, JoinColumn} from 'typeorm';
import { OrmUserEntity } from 'src/user/infraestructure/entities/orm-user.entity';

@Entity('token')
export class Token {

  @PrimaryColumn()
  user: string;

  @Column()
  token: string;

  static create(
    token: string,
    user: User
  ) {
    const tokenEntity = new Token();
    tokenEntity.token = token;
    return tokenEntity;
  }
  
}*/