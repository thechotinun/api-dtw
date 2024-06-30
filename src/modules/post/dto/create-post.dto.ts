import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  community?: number;
}

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(100)
  text: string;
}
