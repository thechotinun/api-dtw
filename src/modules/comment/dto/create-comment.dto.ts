import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MaxLength(100)
  text: string;

  @IsNotEmpty()
  post: number;

  @IsNotEmpty()
  user?: number;
}
