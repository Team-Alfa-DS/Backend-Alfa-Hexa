import { Uuid } from "../value-objects/Uuid";
import { LessonContent } from "../value-objects/lesson-content";
import { LessonDuration } from "../value-objects/lesson-duration";
import { LessonTitle } from "../value-objects/lesson-title";
import { Url } from "../value-objects/url";

export class Lesson {
  readonly id: Uuid;
  readonly title: LessonTitle;
  readonly content: LessonContent;
  readonly seconds: LessonDuration;
  readonly video?: Url;
  readonly image?: Url;

  constructor(
    id: Uuid, 
    title: LessonTitle, 
    content: LessonContent, 
    seconds: LessonDuration, 
    videoUrl?: Url, 
    imageUrl?: Url
  ) {
    if(!imageUrl !== !videoUrl) { //TODO!:Chequear que esta regla de verdad sea necesaria, porque si lo es, hay que buscar una mejor manera de evitarla en la BD
      this.id = id;
      this.title = title;
      this.content = content;
      this.seconds = seconds;
      this.video = videoUrl;
      this.image = imageUrl;
    } else {
      throw new Error("Una lección tiene que tener video o imagen, no ambas"); //this a DomainException bro
    }
  }
}