export class BlogResponseDto {
  constructor(
      readonly id: string,
      readonly title: string,
      readonly image: string,
      readonly date: Date,
      readonly category: string,
      readonly trainer: string, 
      // readonly content: string,
      // readonly comments: string[],              
      // readonly tags: Tag[],
  ){}
}