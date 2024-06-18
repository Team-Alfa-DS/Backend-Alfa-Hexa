/* eslint-disable prettier/prettier */

export class Category{
    id: string;
    name:string;
    icon: string;

    private constructor (id: string, name:string, icon: string){
        this.id= id;
        this.name= name;
        this.icon=icon;
    }

    static Create(id: string, name:string, icon: string) {
        return new Category(id, name, icon);
    }
}
