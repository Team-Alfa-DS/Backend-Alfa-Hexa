export class CourseResponseDto {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly image: string,
    readonly date: Date,
    readonly category: string,
    readonly trainer: string
  ) {}
}