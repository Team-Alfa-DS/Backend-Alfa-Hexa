import { Lesson } from "./Lesson";

export class Course {
  
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly image: string,
    readonly date: Date,
    readonly DurationMinutes: number,
    readonly DurationWeeks: number,
    readonly level: number,
    readonly lessons: Lesson[],
    readonly tags: string[],
    readonly category: string,
    readonly trainer: {id: string, name: string}
  ) {}  
              
}