import { Lesson } from "./Lesson";

export class Course {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly publication_date: Date;
  readonly minutes: number;
  readonly weeks: number;
  readonly lessons: Lesson[];
  // tags: Tag[];
  //category: Category;
  // trainer: Trainer;
  constructor(id: string, name: string, description: string, imageUrl: string, publication_date: Date, 
              minutes: number, weeks: number, lessons: Lesson[]) { //tags:Tag[], category: Category, trainer: Trainer) {
      
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.minutes = minutes;
    this.weeks = weeks;
    this.lessons = lessons;
    //TODO: añadir entidades externas
    //this.tags = tags;
    //this.category = category;
    //this.trainer = trainer;
  }  
  
}