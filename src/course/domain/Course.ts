import { Lesson } from "./Lesson";

export class Course {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  publication_date: Date;
  minutes: number;
  weeks: number;
  lessons: Lesson[];
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
    //this.tags = tags;
    //this.category = category;
    //this.trainer = trainer;
  }  
  
}