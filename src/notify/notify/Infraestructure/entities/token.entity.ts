import { User } from 'src/user/domain/user';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne} from 'typeorm';
import { OrmUserEntity } from 'src/user/infraestructure/entities/orm-entities/orm-user.entity';

@Entity('token')
export class TokenEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => OrmUserEntity, user => user.token)
  @JoinColumn({name : 'user_id'})
  user: OrmUserEntity;

  static create(
    token: string,
    user: OrmUserEntity
  ) {
    const tokenEntity = new TokenEntity();
    tokenEntity.token = token;
    tokenEntity.user = user;
    return tokenEntity;
  }
  
}