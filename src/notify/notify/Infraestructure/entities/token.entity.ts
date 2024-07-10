import { User } from 'src/user/domain/user';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToMany} from 'typeorm';
import { UserEntity } from 'src/user/infraestructure/entities/user.entity';
import { join } from 'path';

@Entity('token')
export class TokenEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToMany(() => UserEntity, user => user.token)
  @JoinColumn({name : 'user_id'})
  user: UserEntity;

  static create(
    token: string,
    user: UserEntity
  ) {
    const tokenEntity = new TokenEntity();
    tokenEntity.token = token;
    tokenEntity.user = user;
    return tokenEntity;
  }
  
}