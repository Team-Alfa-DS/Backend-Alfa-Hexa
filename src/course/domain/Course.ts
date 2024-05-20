import { Lesson } from "./Lesson";

export class Course {
  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    publication_date: Date,
    minutes: number,
    weeks: number,
    lessons: Lesson,
  // tags: Tag[];
  //category: Category;
  //trainer: Trainer;
  ){}
}