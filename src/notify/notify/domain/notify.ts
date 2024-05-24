// import {user} from 'src/user/domain/user';
import { Entity } from 'src/common/domain/entity';

export class Notify extends Entity<string> {
    private title: string;
    private body: string;
    private date: Date;
    private userReaded: boolean;
    //private user?: string  no tenia la carpeta de user creada y en el diagrama no estaba aun ni conectado 

  constructor( id: string, title: string, body: string, date: Date, userReaded: boolean) {
    super(id);
    this.title = title;
    this.body = body;
    this.date = date;
    this.userReaded = userReaded;
    //this.user = user;
 }


 get Title(): string {
    return this.title;
 }


 get Body(): string {
    return this.body;
 }


 get Date(): Date {
    return this.date;
 }


get UserReaded(): boolean {
    return this.userReaded;
}

static Create(id: string, title: string, body: string, date: Date, userReaded: boolean){
    return new Notify(id, title, body, date, userReaded);
}
UpdateuserReaded(userReaded: boolean): void{
    this.userReaded = userReaded;
}

 }