/* eslint-disable prettier/prettier */

export class Category{
    id: string;
    name:string;
    icon: string;
    static Create: any;

    constructor (id: string, name:string, icon: string){
        this.id= id;
        this.name= name;
        this.icon=icon;
    }
}