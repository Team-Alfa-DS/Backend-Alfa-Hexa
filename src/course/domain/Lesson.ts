export class Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;

  constructor(id: string, title: string, content: string, videoUrl?: string, imageUrl?: string) {
    if(!imageUrl !== !videoUrl) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.videoUrl = videoUrl;
      this.imageUrl = imageUrl;
    } else {
      throw new Error("Una lección tiene que tener video o imagen, no ambas");
    }
  }
}