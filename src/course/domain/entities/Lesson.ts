import { Uuid } from "../valueObjects/uuid";

export class Lesson {
  readonly id: Uuid;
  readonly title: string;
  readonly content: string;
  readonly seconds: number;
  readonly video?: string;
  readonly image?: string;

  constructor(id: Uuid, title: string, content: string, seconds: number, videoUrl?: string, imageUrl?: string) {
    if(!imageUrl !== !videoUrl) { //TODO!:Chequear que esta regla de verdad sea necesaria, porque si lo es, hay que buscar una mejor manera de evitarla en la BD
      this.id = id;
      this.title = title;
      this.content = content;
      this.seconds = seconds;
      this.video = videoUrl;
      this.image = imageUrl;
    } else {
      throw new Error("Una lección tiene que tener video o imagen, no ambas");
    }
  }
}