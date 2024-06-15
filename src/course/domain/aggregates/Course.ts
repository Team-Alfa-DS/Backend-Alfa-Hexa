import { Lesson } from "../entities/Lesson";
import { Uuid } from "../valueObjects/uuid";

export class Course {
  
  constructor(
    readonly id: Uuid,
    readonly title: string,
    readonly description: string,
    readonly image: string,
    readonly date: Date,
    readonly durationMinutes: number,
    readonly durationWeeks: number,
    readonly level: string,
    readonly lessons: Lesson[],
    readonly tags: string[],
    readonly category: string,
    readonly trainer: {id: string, name: string}
  ) {}  
              
}